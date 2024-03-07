<?php
session_start();
include '../db/configdb.php';

if (isset($_SESSION['message'])) {
    echo "<script>alert('" . $_SESSION['message'] . "')</script>";
    unset($_SESSION['message']);
}

if (!isset($_SESSION['email'])) {
    header('Location: login.php');
    exit;
}

// Get the email of the currently logged in user
$email = $_SESSION['email'];

// Prepare an SQL statement to get the 'balai_desa' and 'gps' values of the user
$sql = "SELECT balai_desa, gps FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Get the 'balai_desa' and 'gps' values
$balai_desa = $user['balai_desa'];
$gps = $user['gps'];

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
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcqpq8QdjwYc2tnglKoyvpvdZAmEjSxKM&libraries=places"></script>
</head>
<body>
<div class="container mt-5">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="pendataan-tab" data-toggle="tab" href="#pendataan" role="tab"
               aria-controls="pendataan" aria-selected="true">Pendataan</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="permintaan-tab" data-toggle="tab" href="#permintaan" role="tab"
               aria-controls="permintaan" aria-selected="false">Permintaan</a>
        </li>
        <!--        <li class="nav-item">-->
        <!--            <a class="nav-link" id="pendistribusian-tab" data-toggle="tab" href="#pendistribusian" role="tab"-->
        <!--               aria-controls="pendistribusian" aria-selected="false">Pendistribusian</a>-->
        <!--        </li>-->
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="pendataan" role="tabpanel" aria-labelledby="pendataan-tab">
            <!-- Form Pengajuan -->
            <form id="formPendataan" method="post" action="formpendataan">
                <div class="form-group">
                    <label for="lurah_desa">Lurah/Desa: </label>
                    <span style="user-select: none;">Balai Desa </span>
                    <input type="text" class="form-control" id="lurah_desa" name="lurah_desa"
                           value="<?php echo $balai_desa; ?>" readonly>
                </div>

                <script>
                    var input = document.getElementById('lurah_desa');
                    var autocomplete = new google.maps.places.Autocomplete(input);

                    var previousValue = input.value;

                    input.addEventListener('focus', function () {
                        if (!this.value.startsWith('Balai Desa ')) {
                            this.value = 'Balai Desa ' + this.value;
                        }
                        previousValue = this.value;
                    });

                    input.addEventListener('click', function () {
                        if (window.getSelection().toString().startsWith('Balai Desa ')) {
                            this.setSelectionRange('Balai Desa '.length, this.value.length);
                        }
                    });

                    input.addEventListener('input', function () {
                        if (!this.value.startsWith('Balai Desa ')) {
                            this.value = 'Balai Desa ' + this.value;
                        }
                    });

                    input.addEventListener('keydown', function (e) {
                        var selectionStart = this.selectionStart;
                        if (selectionStart < 'Balai Desa '.length) {
                            e.preventDefault();
                        }
                    });

                    autocomplete.addListener('place_changed', function () {
                        var place = autocomplete.getPlace();
                        if (!place.geometry) {
                            window.alert("No details available for input: '" + place.name + "'");
                            return;
                        }

                        // Cek apakah hasil adalah desa
                        if (place.types.includes('sublocality_level_1')) {
                            console.log("Balai Desa " + place.name);
                        } else {
                        }
                    });
                </script>

                <style>
                    #inputTable {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: start;
                        flex-direction: row; /* Baris baru */
                    }

                    .form-group {
                        display: flex;
                        flex-direction: column;
                        align-items: start;
                    }

                    #berat_pangan1 {
                        padding: 10px;
                        margin-top: 8px;
                        bottom: 30%;
                    }

                    .form-control {
                        width: 100%;
                    }

                    input::placeholder {
                        color: rgba(0, 0, 0, 0.5); /* Change opacity here */
                    }

                </style>

                <div id="inputTable">
                    <div class="form-group">
                        <label for="jenis_pangan1">Jenis Pangan 1:</label>
                        <input type="text" class="form-control" id="jenis_pangan1" name="jenis_pangan[]">
                        <!--                        <label for="berat_pangan1">Berat per KG:</label>-->
                        <input type="number" class="form-control" id="berat_pangan1" name="berat_pangan[]"
                               placeholder="Berat per (TON)">
                    </div>
                </div>
                <button type="button" id="tambahInput" class="btn btn-secondary">Tambah</button>
                <button type="button" id="undoInput" class="btn btn-secondary">Hapus</button>
                <button type="button" id="resetInput" class="btn btn-secondary">Reset</button>

                <div class="form-group">
                    <label for="berat">Berat Total (TON):</label>
                    <input type="number" class="form-control" id="berat" name="berat" readonly>
                </div>
                <div class="form-group">
                    <label for="distributor">Distributor:</label>
                    <input type="text" class="form-control" id="distributor" name="distributor">
                </div>
                <div class="form-group">
                    <label for="gps">Set GPS/Lokasi:</label>
                    <input type="text" class="form-control" id="gps" name="gps" value="<?php echo $gps; ?>" readonly>
                </div>
                <div id="mapid1" style="height: 500px;"></div>
                <br>
                <br>
                <br>
                <button type="reset" class="btn btn-secondary">Batal</button>
                <button type="submit" class="btn btn-primary" id="submitBtn" style="display: none;">Kirim</button>
            </form>
            <script>
                function updateTotalBerat() {
                    var beratPanganInputs = document.querySelectorAll('input[name="berat_pangan[]"]');
                    var totalBerat = 0;
                    for (var i = 0; i < beratPanganInputs.length; i++) {
                        totalBerat += Number(beratPanganInputs[i].value);
                    }
                    document.getElementById('berat').value = totalBerat;
                }

                document.getElementById('berat_pangan1').addEventListener('input', updateTotalBerat);

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

                    var newLabelBerat = document.createElement('label');
                    var newInputBerat = document.createElement('input');
                    newInputBerat.type = 'number';
                    newInputBerat.className = 'form-control';
                    newInputBerat.name = 'berat_pangan[]';
                    newInputBerat.placeholder = 'Berat per (TON)';
                    newInputBerat.addEventListener('keypress', function (e) {
                        var char = String.fromCharCode(e.which);
                        if (!(/[0-9,]/.test(char))) {
                            e.preventDefault();
                        }
                    });
                    newInputBerat.addEventListener('input', updateTotalBerat);

                    newFormGroup.appendChild(newLabelBerat);
                    newFormGroup.appendChild(newInputBerat);

                    inputTable.appendChild(newFormGroup);
                    penghitung++;
                });

                document.getElementById('undoInput').addEventListener('click', function () {
                    var inputTable = document.getElementById('inputTable');
                    if (inputTable.children.length > 1) {
                        inputTable.removeChild(inputTable.lastChild);
                        penghitung--;
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

                        // Mengambil semua elemen input
                        var inputs = document.querySelectorAll('input');

                        // Mengatur ulang nilai input
                        for (var i = 0; i < inputs.length; i++) {
                            inputs[i].value = '';
                        }
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

                // document.getElementById('formPendataan').addEventListener('submit', function (event) {
                //     if (!checkInputs()) {
                //         event.preventDefault();
                //         alert('Harap isi semua kolom input sebelum mengirim.');
                //     }
                // });

            </script>
        </div>
        <div class="tab-pane fade" id="permintaan" role="tabpanel" aria-labelledby="permintaan-tab">
            <?php include 'permintaan.php'; ?>
        </div>
        <!-- Your content for this tab goes here -->
    </div>
</div>
</div>
</body>
</html>

<script>
    // Initialize the map for 'mapid1'
    var map1 = L.map('mapid1').setView([-34.397, 150.644], 13);

    // Add the tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map1);

    // Initialize a variable to hold the marker
    var marker1;

    // Get the GPS coordinates from the input
    var gpsInput = document.getElementById('gps');
    var gpsCoords = gpsInput.value.split(',');

    // Add a marker at the GPS coordinates
    marker1 = L.marker([parseFloat(gpsCoords[0]), parseFloat(gpsCoords[1])]).addTo(map1);

    // Set the map view to the GPS coordinates
    map1.setView([parseFloat(gpsCoords[0]), parseFloat(gpsCoords[1])]);

    // Add geocoder control to the map without adding a marker
    var geocoder = L.Control.geocoder({
        geocodeMarker: false,
        defaultMarkGeocode: false
    }).addTo(map1);

    geocoder.on('markgeocode', function (e) {
        // Set the map view to the result location without adding a marker
        map1.setView(e.geocode.center);
    });

    // Ensure the map is fully visible
    map1.invalidateSize();

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if (e.target.hash == '#pendataan2') {
            setTimeout(function () {
                var map2 = L.map('mapid2').setView([-34.397, 150.644], 13);

                // Add the tile layer to the map
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                }).addTo(map2);

                // Initialize a variable to hold the marker
                var marker2;

                // Add a click event to the map
                map2.on('click', function (e) {
                    // If a marker already exists, remove it
                    if (marker2) {
                        map2.removeLayer(marker2);
                    }

                    // Add a new marker at the clicked location
                    marker2 = L.marker(e.latlng).addTo(map2);

                    // Update the GPS input with the clicked location
                    var gpsInput = document.getElementById('gps2');
                    gpsInput.value = e.latlng.lat + ',' + e.latlng.lng;

                    // Dispatch an input event to the GPS input
                    var event = new Event('input');
                    gpsInput.dispatchEvent(event);
                });

                // Add geocoder control to the map without adding a marker
                var geocoder2 = L.Control.geocoder({
                    geocodeMarker: false,
                    defaultMarkGeocode: false
                }).addTo(map2);

                geocoder2.on('markgeocode', function (e) {
                    // Set the map view to the result location without adding a marker
                    map2.setView(e.geocode.center);
                });

                // Ensure the map is fully visible
                map2.invalidateSize();
            }, 500); // Delay for 500 milliseconds
        }
    });
</script>