const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/api/provinsi', async (req, res) => {
    try {
        const response = await axios.get('https://api.rajaongkir.com/starter/province', {
            headers: { "key": "05c6775fbe558c83a759dd42c24a9c36" }
        });
        res.json(response.data.rajaongkir.results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/kabupaten/:provinsiId', async (req, res) => {
    try {
        const response = await axios.get(`https://api.rajaongkir.com/starter/city?province=${req.params.provinsiId}`, {
            headers: { "key": "05c6775fbe558c83a759dd42c24a9c36" }
        });
        res.json(response.data.rajaongkir.results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Anda perlu mengganti URL ini dengan URL API yang sesuai untuk mendapatkan data kecamatan dan kelurahan
app.get('/api/kecamatan/:kabupatenId', async (req, res) => {
    try {
        const response = await axios.get(`URL_API_KECAMATAN?kabupaten=${req.params.kabupatenId}`, {
            headers: { "key": "05c6775fbe558c83a759dd42c24a9c36" }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/kelurahan/:kecamatanId', async (req, res) => {
    try {
        const response = await axios.get(`URL_API_KELURAHAN?kecamatan=${req.params.kecamatanId}`, {
            headers: { "key": "05c6775fbe558c83a759dd42c24a9c36" }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});