<?php
// PHP code
include '../db/configdb.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lurah_desa = mysqli_real_escape_string($conn, $_POST['lurah_desa']);
    $jenis_pangan = implode(", ", $_POST['jenis_pangan']); // handle jenis_pangan as an array
    $jenis_pangan = mysqli_real_escape_string($conn, $jenis_pangan);
    $berat = mysqli_real_escape_string($conn, $_POST['berat']);
    $distributor = mysqli_real_escape_string($conn, $_POST['distributor']);
    $gps = mysqli_real_escape_string($conn, $_POST['gps']);

    $sql = "INSERT INTO informasipangan (lurah_desa, jenis_pangan, berat, distributor, gps)
        VALUES ('$lurah_desa', '$jenis_pangan', '$berat', '$distributor', '$gps')";

    if ($conn->query($sql) === TRUE) {
        $_SESSION['message'] = "Data berhasil disimpan.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Redirect ke halaman yang sama
    header("Location: pendataan");
    exit;
}

$conn->close();

if (isset($_SESSION['message'])) {
    echo "<script>alert('" . $_SESSION['message'] . "')</script>";
    unset($_SESSION['message']);
}
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css"/>
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
</head>
<body>
    <!-- HTML code -->
<div class="container mt-5">
    <div class="tab-pane fade show active" id="pengajuan" role="tabpanel" aria-labelledby="pengajuan-tab">
        <!-- Form Pengajuan -->
        <form id="formInformasiPangan" method="post" action="">
            <!-- ... rest of the form ... -->
        </form>
    </div>
</div>
</body>
</html>

<script>
    // JavaScript code
    var map = L.map('mapid').setView([-34.397, 150.644], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    var marker;
    map.on('click', function (e) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);
        var gpsInput = document.getElementById('gps');
        gpsInput.value = e.latlng.lat + ',' + e.latlng.lng;
        var event = new Event('input');
        gpsInput.dispatchEvent(event);
    });

    L.Control.geocoder({
        defaultMarkGeocode: false,
        geocoder: new L.Control.Geocoder.Nominatim()
    }).on('markgeocode', function (e) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.geocode.center).addTo(map);
        map.setView(e.geocode.center, 13);
        var gpsInput = document.getElementById('gps');
        gpsInput.value = e.geocode.center.lat + ',' + e.geocode.center.lng;
        var event = new Event('input');
        gpsInput.dispatchEvent(event);
    }).addTo(map);
</script><?php
