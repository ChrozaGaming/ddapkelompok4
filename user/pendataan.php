<?php
session_start();
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
    header("Location: pendataan.php");
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
<div class="container mt-5">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="pengajuan-tab" data-toggle="tab" href="#pengajuan" role="tab"
               aria-controls="pengajuan" aria-selected="true">Pengajuan</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="informasiPangan-tab" data-toggle="tab" href="#informasiPangan" role="tab"
               aria-controls="informasiPangan" aria-selected="false">Informasi Pangan</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="pendistribusian-tab" data-toggle="tab" href="#pendistribusian" role="tab"
               aria-controls="pendistribusian" aria-selected="false">Pendistribusian</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="pengajuan" role="tabpanel" aria-labelledby="pengajuan-tab">
            <!-- Form Pengajuan -->
            <form id="formInformasiPangan" method="post" action="">
                <div class="form-group">
                    <label for="lurah_desa">Lurah/Desa:</label>
                    <input type="text" class="form-control" id="lurah_desa" name="lurah_desa">
                </div>

                <style>
                    #inputTable {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: start;
                    }

                    .form-group {
                        flex: 0 0 auto;
                        margin-right: 10px;
                    }
                </style>

                <div id="inputTable">
                    <div class="form-group">
                        <label for="jenis_pangan1">Jenis Pangan 1:</label>
                        <input type="text" class="form-control" id="jenis_pangan1" name="jenis_pangan[]">
                    </div>
                </div>
                <button type="button" id="tambahInput" class="btn btn-secondary">Tambah</button>
                <button type="button" id="undoInput" class="btn btn-secondary">Hapus</button>
                <button type="button" id="resetInput" class="btn btn-secondary">Reset</button>

                <div class="form-group">
                    <label for="berat">Berat Total (TON):</label>
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
                <div id="mapid1" style="height: 500px;"></div>
                <br>
                <br>
                <br>
                <button type="reset" class="btn btn-secondary">Batal</button>
                <button type="submit" class="btn btn-primary" id="submitBtn" style="display: none;">Kirim</button>
            </form>
            <script>
                var penghitung = 2;
                document.getElementById('tambahInput').addEventListener('click', function () {
                    var inputTable = document.getElementById('inputTable');
                    var newFormGroup = document.createElement('div');
                    newFormGroup.className = 'form-group';
                    var newLabel = document.createElement('label');
                    newLabel.textContent = 'Jenis Pangan ' + penghitung + ':';
                    var newInput = document.createElement('input');
                    newInput.type = 'text';
                    newInput.className = 'form-control';
                    newInput.name = 'jenis_pangan[]';
                    newFormGroup.appendChild(newLabel);
                    newFormGroup.appendChild(newInput);
                    inputTable.appendChild(newFormGroup);
                    penghitung++;
                });

                document.getElementById('undoInput').addEventListener('click', function () {
                    var inputTable = document.getElementById('inputTable');
                    if (inputTable.children.length > 1) {
                        inputTable.removeChild(inputTable.lastChild);
                        counter--;
                    }
                });

                document.getElementById('resetInput').addEventListener('click', function () {
                    var confirmation = confirm("Apakah anda yakin untuk mereset row yang sudah anda buat?");
                    if (confirmation) {
                        var inputTable = document.getElementById('inputTable');
                        while (inputTable.children.length > 1) {
                            inputTable.removeChild(inputTable.lastChild);
                        }
                        penghitung = 2;
                    }
                });

                var inputs = document.querySelectorAll('input');
                var submitBtn = document.getElementById('submitBtn');

                function checkInputs() {
                    for (var i = 0; i < inputs.length; i++) {
                        if (inputs[i].value === '') {
                            return false;
                        }
                    }
                    return true;
                }

                for (var i = 0; i < inputs.length; i++) {
                    inputs[i].addEventListener('input', function () {
                        if (checkInputs()) {
                            submitBtn.style.display = 'inline-block';
                        } else {
                            submitBtn.style.display = 'none';
                        }
                    });
                }

                document.getElementById('formInformasiPangan').addEventListener('submit', function (event) {
                    if (!checkInputs()) {
                        event.preventDefault();
                        alert('Harap isi semua kolom input sebelum mengirim.');
                    }
                });
            </script>
        </div>
        <div class="tab-pane fade" id="informasiPangan" role="tabpanel" aria-labelledby="informasiPangan-tab">
            <!-- Form Informasi Pangan -->
            <form id="formInformasiPangan">
                <!-- ... rest of the form ... -->
                <div id="mapid2" style="height: 500px;"></div>
            </form>
        </div>
        <div class="tab-pane fade" id="pendistribusian" role="tabpanel" aria-labelledby="pendistribusian-tab">
            <!-- Form Pendistribusian -->
            <form id="formPendistribusian">
                <!-- ... rest of the form ... -->
            </form>
        </div>
    </div>
</div>
</body>
</html>

<script>
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // Check which tab was shown
        var mapId;
        if (e.target.hash == '#pengajuan') {
            mapId = 'mapid1';
        } else if (e.target.hash == '#informasiPangan') {
            mapId = 'mapid2';
        } else {
            // If the shown tab is not one of the above, do nothing
            return;
        }

        // Initialize the map
        var map = L.map(mapId).setView([-34.397, 150.644], 13);

        // Add the tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Initialize a variable to hold the marker
        var marker;

        // Add a click event to the map
        map.on('click', function (e) {
            // If a marker already exists, remove it
            if (marker) {
                map.removeLayer(marker);
            }

            // Add a new marker at the clicked location
            marker = L.marker(e.latlng).addTo(map);

            // Update the GPS input with the clicked location
            var gpsInput = document.getElementById('gps');
            gpsInput.value = e.latlng.lat + ',' + e.latlng.lng;

            // Dispatch an input event to the GPS input
            var event = new Event('input');
            gpsInput.dispatchEvent(event);
        });

        // Add a geocoder control to the map
        L.Control.geocoder({
            defaultMarkGeocode: false,
            geocoder: new L.Control.Geocoder.Nominatim()
        }).on('markgeocode', function (e) {
            // If a marker already exists, remove it
            if (marker) {
                map.removeLayer(marker);
            }

            // Add a new marker at the geocoded location
            marker = L.marker(e.geocode.center).addTo(map);

            // Center the map on the geocoded location
            map.setView(e.geocode.center, 13);

            // Update the GPS input with the geocoded location
            var gpsInput = document.getElementById('gps');
            gpsInput.value = e.geocode.center.lat + ',' + e.geocode.center.lng;

            // Dispatch an input event to the GPS input
            var event = new Event('input');
            gpsInput.dispatchEvent(event);
        }).addTo(map);
    });
</script>