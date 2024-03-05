<?php
session_start();

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
            <a class="nav-link" id="pendataan-tab2" data-toggle="tab" href="#pendataan2" role="tab"
               aria-controls="pendataan2" aria-selected="false">Pengajuan</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="pendistribusian-tab" data-toggle="tab" href="#pendistribusian" role="tab"
               aria-controls="pendistribusian" aria-selected="false">Pendistribusian</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="pendataan" role="tabpanel" aria-labelledby="pendataan-tab">
            <!-- Form Pengajuan -->
            <form id="formPendataan" method="post" action="formpendataan">
                <div class="form-group">
                    <label for="lurah_desa">Lurah/Desa: </label>
                    <span style="user-select: none;">Balai Desa </span>
                    <input type="text" class="form-control" id="lurah_desa" name="lurah_desa">
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
        <div class="tab-pane fade" id="pendataan2" role="tabpanel" aria-labelledby="pendataan-tab2">
            <form id="formPendataan2" method="post" action="formpendataan2">
                <div class="form-group">
                    <label for="lurah_desa2">Lurah/Desa: </label>
                    <span style="user-select: none;">Balai Desa </span>
                    <input type="text" class="form-control" id="lurah_desa2" name="lurah_desa2">
                </div>

                <script>
                    var input = document.getElementById('lurah_desa2');
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
                    #inputTable2 {
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

                    #berat_pangan2 {
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

                <div id="inputTable2">
                    <div class="form-group">
                        <label for="jenis_pangan2">Jenis Pangan 1:</label>
                        <input type="text" class="form-control" id="jenis_pangan2" name="jenis_pangan2[]">
                        <input type="number" class="form-control" id="berat_pangan2" name="berat_pangan2[]"
                               placeholder="Berat per (TON)">
                    </div>
                </div>
                <button type="button" id="tambahInput2" class="btn btn-secondary">Tambah</button>
                <button type="button" id="undoInput2" class="btn btn-secondary">Hapus</button>
                <button type="button" id="resetInput2" class="btn btn-secondary">Reset</button>

                <div class="form-group">
                    <label for="berat2">Berat Total (TON):</label>
                    <input type="number" class="form-control" id="berat2" name="berat2" readonly>
                </div>
                <div class="form-group">
                    <label for="distributor2">Distributor:</label>
                    <input type="text" class="form-control" id="distributor2" name="distributor2">
                </div>
                <div class="form-group">
                    <label for="gps2">Set GPS/Lokasi:</label>
                    <input type="text" class="form-control" id="gps2" name="gps2" readonly>
                </div>
                <div id="mapid2" style="height: 500px;"></div>
                <br>
                <br>
                <br>
                <div id="error-message" style="color: red;"></div>
                <button type="reset" class="btn btn-secondary">Batal</button>
                <button type="submit" class="btn btn-primary" id="submitBtn2" style="display: none;">Kirim</button>
            </form>
            <script>
                function updateTotalBeratForm2() {
                    var beratPanganInputsForm2 = document.querySelectorAll('input[name="berat_pangan2[]"]');
                    var totalBeratForm2 = 0;
                    for (var i = 0; i < beratPanganInputsForm2.length; i++) {
                        totalBeratForm2 += Number(beratPanganInputsForm2[i].value);
                    }
                    document.getElementById('berat2').value = totalBeratForm2;
                }

                document.getElementById('berat_pangan2').addEventListener('input', updateTotalBeratForm2);

                var penghitungForm2 = 2;

                document.getElementById('tambahInput2').addEventListener('click', function () {
                    var inputTableForm2 = document.getElementById('inputTable2');
                    var newFormGroupForm2 = document.createElement('div');
                    newFormGroupForm2.className = 'form-group';

                    var newLabelForm2 = document.createElement('label');
                    newLabelForm2.textContent = 'Jenis Pangan ' + penghitungForm2 + ':';
                    var newInputForm2 = document.createElement('input');
                    newInputForm2.type = 'text';
                    newInputForm2.className = 'form-control';
                    newInputForm2.name = 'jenis_pangan2[]';
                    newFormGroupForm2.appendChild(newLabelForm2);
                    newFormGroupForm2.appendChild(newInputForm2);

                    var newLabelBeratForm2 = document.createElement('label');
                    var newInputBeratForm2 = document.createElement('input');
                    newInputBeratForm2.type = 'number';
                    newInputBeratForm2.className = 'form-control';
                    newInputBeratForm2.name = 'berat_pangan2[]';
                    newInputBeratForm2.placeholder = 'Berat per (TON)';
                    newInputBeratForm2.addEventListener('keypress', function (e) {
                        var char = String.fromCharCode(e.which);
                        if (!(/[0-9,]/.test(char))) {
                            e.preventDefault();
                        }
                    });
                    newInputBeratForm2.addEventListener('input', updateTotalBeratForm2);

                    newFormGroupForm2.appendChild(newLabelBeratForm2);
                    newFormGroupForm2.appendChild(newInputBeratForm2);

                    inputTableForm2.appendChild(newFormGroupForm2);
                    penghitungForm2++;
                });

                document.getElementById('undoInput2').addEventListener('click', function () {
                    var inputTable = document.getElementById('inputTable2');
                    if (inputTable.children.length > 1) {
                        inputTable.removeChild(inputTable.lastChild);
                        penghitung--;
                    }
                });

                document.getElementById('resetInput2').addEventListener('click', function () {
                    var confirmation = confirm("Apakah anda yakin untuk mereset row yang sudah anda buat?");
                    if (confirmation) {
                        var inputTable = document.getElementById('inputTable2');
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

                var inputsForm2 = Array.from(document.querySelectorAll('#formPendataan2 input'));
                var submitBtnForm2 = document.getElementById('submitBtn2');

                function checkInputsForm2() {
                    var allFilledForm2 = inputsForm2.every(function (input) {
                        return input.value !== '';
                    });
                    submitBtnForm2.style.display = allFilledForm2 ? 'inline-block' : 'none';
                }

                inputsForm2.forEach(function (input) {
                    input.addEventListener('input', checkInputsForm2);
                });

                // document.getElementById('formPendataan2').addEventListener('submit', function (event) {
                //     if (!checkInputsForm2()) {
                //         event.preventDefault();
                //         document.getElementById('error-message').textContent = 'Harap isi semua kolom input sebelum mengirim.';
                //     }
                // });
            </script>
        </div>
        <div class="tab-pane fade" id="pendistribusian" role="tabpanel" aria-labelledby="pendistribusian-tab">
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

    // Add a click event to the map
    map1.on('click', function (e) {
        // If a marker already exists, remove it
        if (marker1) {
            map1.removeLayer(marker1);
        }

        // Add a new marker at the clicked location
        marker1 = L.marker(e.latlng).addTo(map1);

        // Update the GPS input with the clicked location
        var gpsInput = document.getElementById('gps');
        gpsInput.value = e.latlng.lat + ',' + e.latlng.lng;

        // Dispatch an input event to the GPS input
        var event = new Event('input');
        gpsInput.dispatchEvent(event);
    });

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