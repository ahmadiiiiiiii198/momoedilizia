const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const path = require('path');

const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const body = JSON.parse(event.body);
        const files = body.files || [{ filename: body.filename, contentType: body.contentType }];
        const results = [];

        for (const file of files) {
            const fileExt = path.extname(file.filename);
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExt}`;

            const command = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: fileName,
                ContentType: file.contentType || 'application/octet-stream',
            });

            const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });
            const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

            results.push({ uploadUrl, publicUrl });
        }

        if (body.files) {
            return { statusCode: 200, headers, body: JSON.stringify({ results }) };
        } else {
            return { statusCode: 200, headers, body: JSON.stringify(results[0]) };
        }
    } catch (error) {
        console.error('Get upload URL error:', error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to generate upload URL' }) };
    }
};
