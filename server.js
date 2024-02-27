const express = require('express');
const geografis = require('geografis');
const app = express();
const port = 3000;

app.get('/api/provinces', (req, res) => {
    const provinces = geografis.getProvinces();
    console.log(provinces)
    res.json(provinces);
});

app.get('/api/province', (req, res) => {
    const provinces = geografis.getProvinces();
    res.json(provinces);
});
app.get('/api/city/:cityId', (req, res) => {
    const city = geografis.getCity(req.params.cityId);
    res.json(city);
});

app.get('/api/district/:districtId', (req, res) => {
    const district = geografis.getDistrict(req.params.districtId);
    res.json(district);
});

app.get('/api/village/:villageId', (req, res) => {
    const village = geografis.getVillage(req.params.villageId);
    res.json(village);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});