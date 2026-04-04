require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve the main website from root
app.use(express.static(__dirname));

// Multer setup for in-memory file handling
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for videos
});

// S3 Client configured for Cloudflare R2
const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

// Upload API Endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Create a unique filename
        const fileExt = path.extname(req.file.originalname);
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExt}`;

        // S3 PutObject command
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        });

        // Upload to Cloudflare R2
        await s3Client.send(command);

        // Generate public URL
        const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

        // Return the public URL
        res.json({ url: publicUrl });
    } catch (error) {
        console.error('Error uploading file to Cloudflare R2:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

// Upload Multiple API Endpoint
app.post('/api/upload-multiple', upload.array('files', 50), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const uploadPromises = req.files.map(async (file) => {
            const fileExt = path.extname(file.originalname);
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExt}`;

            const command = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            });

            await s3Client.send(command);
            return `${process.env.R2_PUBLIC_URL}/${fileName}`;
        });

        const urls = await Promise.all(uploadPromises);
        res.json({ urls });
    } catch (error) {
        console.error('Error uploading multiple files to Cloudflare R2:', error);
        res.status(500).json({ error: 'Failed to upload files' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Admin panel available at http://localhost:${PORT}/admin`);
});
