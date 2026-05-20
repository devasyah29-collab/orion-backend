require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Konfigurasi batas ukuran JSON ke 50mb karena kita mengirim gambar base64
app.use(cors({ origin: 'https://orion-frontend-rho.vercel.app' }));
app.use(express.json({ limit: '50mb' })); 

// Endpoint untuk Generate Image/Text ke Gemini
app.post('/api/gemini', async (req, res) => {
    try {
        // Ambil payload/data dari frontend (React)
        const payload = req.body;
        
        // Ambil API Key secara aman dari environment variable server
        const apiKey = process.env.GEMINI_API_KEY;
        
        // URL asli Google Gemini
        // (Anda bisa membuat endpoint spesifik untuk text dan image jika diperlukan)
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        // Lakukan fetch dari backend ke Google
        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        // Kembalikan hasilnya ke Frontend (React)
        res.json(data);

    } catch (error) {
        console.error('Error memanggil Gemini API:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

const PORT = process.env.PORT || 5000;

module.exports = app;