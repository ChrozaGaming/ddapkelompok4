const geografis = require('geografis');

// Mendapatkan semua data kelurahan/desa dari database
const dump = geografis.dump();
console.log(dump);

// Mencari kode wilayah, kode pos, nama desa/kelurahan, kecamatan, dan kota
const query = "ciumbuleuit bandung";
const search = geografis.search(query, 10, 0);
console.log(search);

// Mendapatkan list nama-nama provinsi
const provinces = geografis.getProvinces();
console.log(provinces);

// Mendapatkan detil provinsi berdasarkan kode wilayah
const province = geografis.getProvince('32');
console.log(province);

// Mendapatkan detil provinsi berdasarkan slug
const provinceBySlug = geografis.getProvinceBySlug('dki-jakarta');
console.log(provinceBySlug);

// Mendapatkan detil kota/kabupaten berdasarkan kode wilayah
const city = geografis.getCity('31.71');
console.log(city);

// Mendapatkan detil kota/kabupaten berdasarkan slug
const cityBySlug = geografis.getCityBySlug('jawa-barat/kota-bandung');
console.log(cityBySlug);

// Mendapatkan detil kecamatan berdasarkan kode wilayah
const district = geografis.getDistrict('31.71.01');
console.log(district);

// Mendapatkan detil kecamatan berdasarkan slug
const districtBySlug = geografis.getDistrictBySlug('jawa-barat/kota-bandung/coblong');
console.log(districtBySlug);

// Mendapatkan detil desa/kelurahan berdasarkan kode wilayah
const village = geografis.getVillage('31.71.01.1001');
console.log(village);

// Mendapatkan detil desa/kelurahan berdasarkan slug
const villageBySlug = geografis.getVillageBySlug('jawa-barat/kota-bandung/cidadap/hegarmanah');
console.log(villageBySlug);

// Mendapatkan detil desa/kelurahan berdasarkan kode pos
const villageByPostalCode = geografis.getVillageByPostalCode(40142);
console.log(villageByPostalCode);

// Mendapatkan desa/kelurahan terdekat
const nearestVillage = geografis.getNearest(-6.8822007,107.6142733);
console.log(nearestVillage);