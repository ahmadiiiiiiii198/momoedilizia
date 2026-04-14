const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');

const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

function parseMultipart(body, boundary) {
    const parts = [];
    const boundaryBuffer = Buffer.from('--' + boundary);
    let start = body.indexOf(boundaryBuffer) + boundaryBuffer.length;

    while (start < body.length) {
        const nextBoundary = body.indexOf(boundaryBuffer, start);
        if (nextBoundary === -1) break;

        const part = body.slice(start, nextBoundary);
        const headerEnd = part.indexOf('\r\n\r\n');
        if (headerEnd === -1) { start = nextBoundary + boundaryBuffer.length; continue; }

        const headerStr = part.slice(0, headerEnd).toString();
        const data = part.slice(headerEnd + 4, part.length - 2);

        const filenameMatch = headerStr.match(/filename="([^"]+)"/);
        const contentTypeMatch = headerStr.match(/Content-Type:\s*(.+)/i);

        if (filenameMatch) {
            parts.push({
                filename: filenameMatch[1],
                type: contentTypeMatch ? contentTypeMatch[1].trim() : 'application/octet-stream',
                data: data,
            });
        }
        start = nextBoundary + boundaryBuffer.length;
    }
    return parts;
}

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const contentType = event.headers['content-type'] || '';
        const boundary = contentType.split('boundary=')[1];
        if (!boundary) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'No boundary in content-type' }) };
        }

        const body = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');
        const parts = parseMultipart(body, boundary);

        if (!parts || parts.length === 0) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'No files uploaded' }) };
        }

        const uploadPromises = parts.map(async (file) => {
            const fileExt = path.extname(file.filename);
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExt}`;

            const command = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: fileName,
                Body: file.data,
                ContentType: file.type,
            });

            await s3Client.send(command);
            return `${process.env.R2_PUBLIC_URL}/${fileName}`;
        });

        const urls = await Promise.all(uploadPromises);
        return { statusCode: 200, headers, body: JSON.stringify({ urls }) };
    } catch (error) {
        console.error('Upload error:', error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to upload files' }) };
    }
};
