<?php
?>
<!DOCTYPE html>
<html>
<head>
    <title>Update Gizi Data</title>
</head>
<body>
<form action="update_gizi.php" method="post">
    <label for="province_id">Provinsi:</label><br>
    <select id="province_id" name="province_id">
        <option value="id-ac">Aceh</option>
        <option value="id-ba">Bali</option>
        <option value="id-bt">Banten</option>
        <option value="id-bb">Bangka Belitung</option>
        <option value="id-be">Bengkulu</option>
        <option value="id-yo">DI Yogyakarta</option>
        <option value="id-jk">DKI Jakarta</option>
        <option value="id-go">Gorontalo</option>
        <option value="id-jr">Jawa Barat</option>
        <option value="id-jt">Jawa Tengah</option>
        <option value="id-ji">Jawa Timur</option>
        <option value="id-kb">Kalimantan Barat</option>
        <option value="id-ks">Kalimantan Selatan</option>
        <option value="id-kt">Kalimantan Tengah</option>
        <option value="id-ki">Kalimantan Timur</option>
        <option value="id-ku">Kalimantan Utara</option>
        <option value="id-kr">Kepulauan Riau</option>
        <option value="id-la">Lampung</option>
        <option value="id-ma">Maluku</option>
        <option value="id-nb">Nusa Tenggara Barat</option>
        <option value="id-nt">Nusa Tenggara Timur</option>
        <option value="id-pa">Papua</option>
        <option value="id-pb">Papua Barat</option>
        <option value="id-ri">Riau</option>
        <option value="id-sr">Sulawesi Barat</option>
        <option value="id-sg">Sulawesi Tengah</option>
        <option value="id-st">Sulawesi Tenggara</option>
        <option value="id-sa">Sulawesi Utara</option>
        <option value="id-sl">Sumatera Barat</option>
        <option value="id-se">Sumatera Selatan</option>
        <option value="id-su">Sumatera Utara</option>
    </select><br>
    <label for="gizi_value">Jumlah Orang yang Kekurangan Gizi:</label><br>
    <input type="number" id="gizi_value" name="gizi_value"><br>
    <input type="submit" value="Submit">
</form>
</body>
</html>