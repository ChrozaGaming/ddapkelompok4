<?php
include '../db/configdb.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lurah_desa = mysqli_real_escape_string($conn, $_POST['lurah_desa']);
    $jenis_pangan = mysqli_real_escape_string($conn, $_POST['jenis_pangan']);
    $berat = mysqli_real_escape_string($conn, $_POST['berat']);
    $distributor = mysqli_real_escape_string($conn, $_POST['distributor']);
    $gps = mysqli_real_escape_string($conn, $_POST['gps']);

    $sql = "INSERT INTO informasipangan (lurah_desa, jenis_pangan, berat, distributor, gps)
        VALUES ('$lurah_desa', '$jenis_pangan', '$berat', '$distributor', '$gps')";

    if ($conn->query($sql) === TRUE) {
        echo "Data berhasil disimpan.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
</head>
<body>
<div class="container mt-5">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="pengajuan-tab" data-toggle="tab" href="#pengajuan" role="tab" aria-controls="pengajuan" aria-selected="true">Pengajuan</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="informasiPangan-tab" data-toggle="tab" href="#informasiPangan" role="tab" aria-controls="informasiPangan" aria-selected="false">Informasi Pangan</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="pendistribusian-tab" data-toggle="tab" href="#pendistribusian" role="tab" aria-controls="pendistribusian" aria-selected="false">Pendistribusian</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="pengajuan" role="tabpanel" aria-labelledby="pengajuan-tab">
            <!-- Form Pengajuan -->
            <form id="formInformasiPangan" method="post" action="submit_informasi_pangan.php">
                <div class="form-group">
                    <label for="lurah_desa">Lurah/Desa:</label>
                    <input type="text" class="form-control" id="lurah_desa" name="lurah_desa">
                </div>
                <div class="form-group">
                    <label for="jenis_pangan">Jenis Pangan:</label>
                    <input type="text" class="form-control" id="jenis_pangan" name="jenis_pangan">
                </div>
                <div class="form-group">
                    <label for="berat">Berat (TON):</label>
                    <input type="number" class="form-control" id="berat" name="berat">
                </div>
                <div class="form-group">
                    <label for="distributor">Distributor:</label>
                    <input type="text" class="form-control" id="distributor" name="distributor">
                </div>
                <div class="form-group">
                    <label for="gps">Set GPS/Lokasi:</label>
                    <input type="text" class="form-control" id="gps" name="gps" readonly>
                </div>
                <div id="mapid" style="height: 500px;"></div>
                <br>
                <br>
                <br>
                <button type="reset" class="btn btn-secondary">Batal</button>
                <button type="submit" class="btn btn-primary">Kirim</button>
            </form>
            <br>
            <br>
            <br>
        </div>
        <div class="tab-pane fade" id="informasiPangan" role="tabpanel" aria-labelledby="informasiPangan-tab">
            <!-- Form Informasi Pangan -->
            <form id="formInformasiPangan">
                <!-- Isi form informasi pangan di sini -->
            </form>
        </div>
        <div class="tab-pane fade" id="pendistribusian" role="tabpanel" aria-labelledby="pendistribusian-tab">
            <!-- Form Pendistribusian -->
            <form id="formPendistribusian">
                <!-- Isi form pendistribusian di sini -->
            </form>
        </div>
    </div>
</div>
</body>
</html>

<script>
    var map = L.map('mapid').setView([-34.397, 150.644], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    var marker;
    map.on('click', function(e) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);
        document.getElementById('gps').value = e.latlng.lat + ',' + e.latlng.lng;
    });

    L.Control.geocoder({
        defaultMarkGeocode: false,
        geocoder: new L.Control.Geocoder.Nominatim()
    }).on('markgeocode', function(e) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.geocode.center).addTo(map);
        map.setView(e.geocode.center, 13);
        document.getElementById('gps').value = e.geocode.center.lat + ',' + e.geocode.center.lng;
    }).addTo(map);
</script>