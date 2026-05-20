require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Konfigurasi batas ukuran JSON ke 50mb karena kita mengirim gambar base64
app.use(cors({ origin: 'https://orion-frontend-rho.vercel.app' }));
app.use(express.json({ limit: '50mb' })); 

// Endpoint untuk Generate Image/Text ke Gemini
// Ganti bagian app.post('/api/gemini', ...) di server.js Anda dengan ini:
app.post('/api/gemini', async (req, res) => {
    try {
        const payload = req.body;
        const apiKey = process.env.GEMINI_API_KEY;
        
        // MENERIMA MODEL DINAMIS DARI FRONTEND (Default ke model teks jika kosong)
        const model = req.query.model || 'gemini-2.5-flash-preview-09-2025';
        
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error memanggil Gemini API:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

const PORT = process.env.PORT || 5000;

module.exports = app;