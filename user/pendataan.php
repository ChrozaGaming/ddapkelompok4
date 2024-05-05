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

// Check if the email already exists in the table
$sql = "SELECT * FROM pendataan WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// If the email already exists, set the button text to 'Update'
if ($result->num_rows > 0) {
    $buttonText = 'Update';
} else {
    // If the email doesn't exist, set the button text to 'Kirim'
    $buttonText = 'Kirim';
}

$sql = "SELECT total_harga FROM pendataan WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($row = $result->fetch_assoc()) {
    $totalHarga = $row['total_harga'];
} else {
    $totalHarga = 0; // Atau nilai default lainnya jika tidak ditemukan
}
$stmt->close();

?>

<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcqpq8QdjwYc2tngkoyvpvdZAmEjSxKM&libraries=places"></script>
</head>

<body>
    <div class="container mt-5">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="pendataan-tab" data-toggle="tab" href="#pendataan" role="tab" aria-controls="pendataan" aria-selected="true">Pendataan</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="permintaan-tab" data-toggle="tab" href="#permintaan" role="tab" aria-controls="permintaan" aria-selected="false">Permintaan</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="pendataan" role="tabpanel" aria-labelledby="pendataan-tab">
                <!-- Form Pengajuan -->
                <form id="formPendataan" method="post" action="formpendataan.php">
                    <div class="form-group">
                        <label for="lurah_desa">Lurah/Desa: </label>
                        <span style="user-select: none;">Balai Desa </span>
                        <input type="text" class="form-control no-reset" id="lurah_desa" name="lurah_desa" value="<?php echo $balai_desa; ?>" readonly> <!-- <input type="hidden" name="lurah_desa" value="<?php echo $balai_desa; ?>"> -->
                    </div>

                    <script>
                        var input = document.getElementById('lurah_desa');
                        var autocomplete = new google.maps.places.Autocomplete(input);

                        var previousValue = input.value;

                        input.addEventListener('focus', function() {
                            if (!this.value.startsWith('Balai Desa ')) {
                                this.value = 'Balai Desa ' + this.value;
                            }
                            previousValue = this.value;
                        });

                        input.addEventListener('click', function() {
                            if (window.getSelection().toString().startsWith('Balai Desa ')) {
                                this.setSelectionRange('Balai Desa '.length, this.value.length);
                            }
                        });

                        input.addEventListener('input', function() {
                            if (!this.value.startsWith('Balai Desa ')) {
                                this.value = 'Balai Desa ' + this.value;
                            }
                        });

                        input.addEventListener('keydown', function(e) {
                            var selectionStart = this.selectionStart;
                            if (selectionStart < 'Balai Desa '.length) {
                                e.preventDefault();
                            }
                        });

                        autocomplete.addListener('place_changed', function() {
                            var place = autocomplete.getPlace();
                            if (!place.geometry) {
                                window.alert("No details available for input: '" + place.name + "'");
                                return;
                            }

                            // Cek apakah hasil adalah desa
                            if (place.types.includes('sublocality_level_1')) {
                                console.log("Balai Desa " + place.name);
                            } else {}
                        });

                        window.onload = function() {
                            var input = document.getElementById('lurah_desa');
                            var inputValue = input.value;

                            if (!inputValue.includes('Balai Desa')) {
                                input.value = 'Balai Desa ' + inputValue;
                            }
                        }
                    </script>

                    <style>
                        #inputTable {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: start;
                            flex-direction: row;
                            /* Baris baru */
                        }

                        .form-group {
                            display: flex;
                            flex-direction: column;
                            align-items: start;
                        }

                        #berat_ pangan1 {
                            padding: 10px;
                            margin-top: 8px;
                            bottom: 30%;
                        }

                        .form-control {
                            width: 100%;
                        }

                        input::placeholder {
                            color: rgba(0, 0, 0, 0.5);
                            /* Change opacity here */
                        }
                    </style>

                    <div id="inputTable">
                        <div class="form-group">
                            <label for="jenis_pangan1">Jenis Pangan 1:</label>
                            <input type="text" class="form-control" id="jenis_pangan1" name="jenis_pangan[]" placeholder="">
                            <label for="berat_pangan1">Berat per (TON):</label>
                            <input type="number" class="form-control" id="berat_pangan1" name="berat_pangan[]" placeholder="Berat per (TON)">
                            <label for="harga_satuan1">Harga Satuan (Rp):</label>
                            <input type="text" class="form-control" id="harga_satuan1" name="harga_satuan[]" placeholder="Harga Satuan (Rp)">
                        </div>
                    </div>
                    <button type="button" id="tambahInput" class="btn btn-success">Tambah</button>
                    <button type="button" id="undoInput" class="btn btn-warning">Hapus</button>
                    <button type="button" id="resetInput" class="btn btn-danger">Reset</button>
                    <div class="form-group">
                        <label for="berat">Berat Total (TON):</label>
                        <input type="number" class="form-control" id="berat" name="berat" readonly>
                    </div>
                    <div class="form-group">
                        <label for="total_harga">Total Harga Pangan Saat Ini:</label>
                        <input type="text" class="form-control" id="total_harga_display" name="total_harga_display" value="<?php echo 'Rp. ' . number_format($totalHarga, 2, ',', '.'); ?>" readonly>
                        <input type="hidden" name="total_harga_hidden" id="total_harga_hidden" value="<?php echo $totalHarga; ?>">
                    </div>
                    <div class="form-group">
                        <label for="distributor">Distributor:</label>
                        <input type="text" class="form-control" id="distributor" name="distributor">
                    </div>
                    <div class="form-group">
                        <label for="gps">GPS/Lokasi:</label>
                        <input type="text" class="form-control" id="gps" name="gps" value="<?php echo $gps; ?>" readonly>
                    </div>
                    <div id="mapid1" style="height: 500px;"></div>
                    <br>
                    <br>
                    <br>
                    <button type="reset" class="btn btn-secondary">Batal</button>
                    <button type="submit" class="btn btn-primary" id="submitBtn" style="display: none;"><?php echo $buttonText; ?></button>
                </form>
                <script>
                    /**
                     * Fungsi untuk mengupdate total berat pangan
                     * Fungsi ini akan mengambil semua input berat pangan, menghitung totalnya,
                     * dan menampilkan hasilnya pada input dengan id 'berat'.
                     */
                    function updateTotalBerat() {
                        // Mengambil semua input berat pangan
                        var beratPanganInputs = document.querySelectorAll('input[name="berat_pangan[]"]');
                        // Inisialisasi variabel untuk menyimpan total berat
                        var totalBerat = 0;
                        // Melakukan iterasi pada setiap input berat pangan
                        for (var i = 0; i < beratPanganInputs.length; i++) {
                            // Menambahkan nilai input ke total berat
                            totalBerat += Number(beratPanganInputs[i].value);
                        }


                        // pastikan totalBerat harus bernilai positif (> 0) sebelum memasukkannya ke input
                        // asumsikan logika penghitungan total berat di sini

                        if (totalBerat <= 0) {
                            document.getElementById('berat').value = '';
                        } else {
                            document.getElementById('berat').value = totalBerat;
                        }
                    }

                    /**
                     * Fungsi untuk memformat angka ke dalam format rupiah
                     * @param {angka} angka - Angka yang akan diformat
                     * @return {string} Angka yang telah diformat ke dalam bentuk rupiah
                     */
                    function formatRupiah(angka) {

                        // Membalikkan urutan angka dan membaginya menjadi array

                        var reverse = angka.toString().split('').reverse().join(''),

                            // Mencocokkan setiap tiga angka dan menggabungkannya dengan titik

                            ribuan = reverse.match(/\d{1,3}/g);

                        // Menggabungkan kembali array menjadi string dan membalikkan urutannya

                        ribuan = ribuan.join('.').split('').reverse().join('');

                        // Menambahkan prefix(awalan) 'Rp.' dan suffix(akhiran) ',00'

                        return 'Rp.' + ribuan + ',00';

                    }

                    document.addEventListener('DOMContentLoaded', function() {
                        var inputBeratPangan = document.getElementById('berat_pangan1');

                        inputBeratPangan.addEventListener('input', function() {
                            if (inputBeratPangan.value <= 0) {
                                inputBeratPangan.value = ''; // Mengosongkan input jika nilai kurang dari atau sama dengan 0
                            }
                        });
                    });


                    /**
                     * Fungsi untuk mengupdate total harga pangan
                     * Fungsi ini akan mengambil semua input harga satuan dan berat pangan, menghitung total harganya,
                     * dan menampilkan hasilnya pada input dengan id 'total_harga' dalam format rupiah.
                     */
                    function updateTotalHarga() {
                        // Mengambil semua input harga satuan
                        var hargaSatuanInputs = document.querySelectorAll('input[name="harga_satuan[]"]');
                        // Mengambil semua input berat pangan
                        var beratPanganInputs = document.querySelectorAll('input[name="berat_pangan[]"]');
                        // Inisialisasi variabel untuk menyimpan total harga
                        var totalHarga = 0;
                        // Melakukan iterasi pada setiap input harga satuan dan berat pangan
                        for (var i = 0; i < hargaSatuanInputs.length; i++) {
                            // Mengkonversi nilai input harga satuan ke dalam angka
                            var hargaSatuan = Number(hargaSatuanInputs[i].value);
                            var beratPangan = Number(beratPanganInputs[i].value);
                            totalHarga += hargaSatuan * beratPangan;
                        }
                        // Menampilkan total harga pada input dengan id 'total_harga' dalam format rupiah
                        document.getElementById('total_harga_display').value = formatRupiah(totalHarga);
                        document.getElementById('total_harga_hidden').value = totalHarga;
                    }

                    document.querySelectorAll('input[name="harga_satuan[]"]').forEach(inputElement => {
                        inputElement.addEventListener('input', updateTotalHarga);
                    });

                    document.getElementById('berat_pangan1').addEventListener('input', updateTotalBerat);

                    var penghitung = 2;

                    document.getElementById('tambahInput').addEventListener('click', function() {
                        // Cek apakah input terakhir sudah diisi semua sebelum menambahkan baris baru
                        var lastJenisPangan = document.querySelector('input[name="jenis_pangan[]"]:last-of-type');
                        var lastBeratPangan = document.querySelector('input[name="berat_pangan[]"]:last-of-type');
                        var lastHargaSatuan = document.querySelector('input[name="harga_satuan[]"]:last-of-type');

                        if (!lastJenisPangan || !lastBeratPangan || !lastHargaSatuan || // Jika ini adalah baris pertama
                            (lastJenisPangan.value.trim() !== '' && lastBeratPangan.value.trim() !== '' && lastHargaSatuan.value.trim() !== '')) { // Atau jika semua input terakhir sudah diisi
                            // Lanjutkan menambahkan input baru
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
                            newLabelBerat.textContent = 'Berat per (TON):';
                            var newInputBerat = document.createElement('input');
                            newInputBerat.type = 'number';
                            newInputBerat.className = 'form-control';
                            newInputBerat.name = 'berat_pangan[]';
                            newInputBerat.placeholder = 'Berat per (TON)';
                            newInputBerat.disabled = true; // Awalnya nonaktif
                            newFormGroup.appendChild(newLabelBerat);
                            newFormGroup.appendChild(newInputBerat);

                            var newLabelHargaSatuan = document.createElement('label');
                            newLabelHargaSatuan.textContent = 'Harga Satuan (Rp):';
                            var newInputHargaSatuan = document.createElement('input');
                            newInputHargaSatuan.type = 'text';
                            newInputHargaSatuan.className = 'form-control';
                            newInputHargaSatuan.name = 'harga_satuan[]';
                            newInputHargaSatuan.placeholder = 'Harga Satuan (Rp)';
                            newInputHargaSatuan.disabled = true; // Awalnya nonaktif
                            newFormGroup.appendChild(newLabelHargaSatuan);
                            newFormGroup.appendChild(newInputHargaSatuan);

                            inputTable.appendChild(newFormGroup);
                            penghitung++;

                            // Aktifkan input berat pangan setelah jenis pangan diisi
                            newInput.addEventListener('input', function() {
                                if (newInput.value.trim() !== '') {
                                    newInputBerat.disabled = false;
                                } else {
                                    newInputBerat.disabled = true;
                                    newInputHargaSatuan.disabled = true;
                                }
                            });

                            // Aktifkan input harga satuan setelah berat pangan diisi
                            newInputBerat.addEventListener('input', function() {
                                if (newInputBerat.value.trim() !== '') {
                                    newInputHargaSatuan.disabled = false;
                                } else {
                                    newInputHargaSatuan.disabled = true;
                                }
                            });

                            // Tambahkan event listener untuk memperbarui total harga ketika input harga satuan baru diisi
                            newInputHargaSatuan.addEventListener('input', updateTotalHarga);
                        } else {
                            // Jika input terakhir belum diisi semua, tampilkan alert
                            alert('Harap isi semua input pada baris terakhir sebelum menambahkan yang baru.');
                        }
                    });
                    document.getElementById('undoInput').addEventListener('click', function() {
                        var inputTable = document.getElementById('inputTable');
                        if (inputTable.children.length > 1) {
                            inputTable.removeChild(inputTable.lastChild);
                            penghitung--;
                        }
                    });

                    document.getElementById('resetInput').addEventListener('click', function() {
                        var confirmation = confirm("Apakah anda yakin untuk mereset row yang sudah anda buat?");
                        if (confirmation) {
                            var inputTable = document.getElementById('inputTable');
                            while (inputTable.children.length > 1) {
                                inputTable.removeChild(inputTable.lastChild);
                            }
                            penghitung = 2;

                            // Mengambil semua elemen input
                            var inputs = document.querySelectorAll('input');

                            // Mencegah agar ketika saya menekan tombol resetInput maka kolom input balai_desa tidak
                            // mereset hasil dari user balai_desa
                            for (var i = 0; i < inputs.length; i++) {
                                // Periksa apakah elemen input saat ini tidak memiliki kelas 'no-reset'
                                if (!inputs[i].classList.contains('no-reset')) {
                                    // Jika elemen input tidak memiliki kelas 'no-reset', atur nilai input menjadi kosong saja ('')
                                    inputs[i].value = '';
                                }
                            }
                        }
                    });

                    var inputs = document.querySelectorAll('input');
                    document.getElementById('submitBtn').addEventListener('click', function() {
                        var totalHarga = document.getElementById('total_harga').value;
                        document.getElementById('total_harga_hidden').value = totalHarga.replace(/[^0-9,-]+/g, "");
                    });

                    function checkInputs() {
                        for (var i = 0; i < inputs.length; i++) {
                            if (inputs[i].value === '') {
                                return false;
                            }
                        }
                        return true;
                    }

                    for (var i = 0; i < inputs.length; i++) {
                        inputs[i].addEventListener('input', function() {
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

    geocoder.on('markgeocode', function(e) {
        // Set the map view to the result location without adding a marker
        map1.setView(e.geocode.center);
    });

    // Ensure the map is fully visible
    map1.invalidateSize();

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        if (e.target.hash == '#pendataan2') {
            setTimeout(function() {
                var map2 = L.map('mapid2').setView([-34.397, 150.644], 13);

                // Add the tile layer to the map
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                }).addTo(map2);

                // Initialize a variable to hold the marker
                var marker2;

                // Add a click event to the map
                map2.on('click', function(e) {
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

                geocoder2.on('markgeocode', function(e) {
                    // Set the map view to the result location without adding a marker
                    map2.setView(e.geocode.center);
                });

                // Ensure the map is fully visible
                map2.invalidateSize();
            }, 500); // Delay for 500 milliseconds
        }
    });
</script>

<script>
    // Mencegah user memasukkan simbol tanda baca selain angka 0-9 pada input (harga_satuan1)


    // Menunggu dokumen untuk dimuat sepenuhnya
    document.addEventListener('DOMContentLoaded', function() {
        // Mendapatkan elemen input untuk harga satuan
        var inputHargaSatuan = document.getElementById('harga_satuan1');

        // Menambahkan event listener untuk menangani penekanan tombol pada input harga satuan
        inputHargaSatuan.addEventListener('keypress', function(e) {
            // Mencegah input selain angka
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });

        // Menambahkan event listener untuk menangani pemasukan data dari paste pada input harga satuan
        inputHargaSatuan.addEventListener('paste', function(e) {
            // Mencegah aksi paste default
            e.preventDefault();
            // Mengambil data yang dipaste dan memfilter sehingga hanya angka yang diperbolehkan
            var pasteData = e.clipboardData.getData('text');
            var filteredPasteData = pasteData.replace(/[^0-9]/g, '');
            // Memasukkan data yang sudah difilter ke dalam input
            document.execCommand("insertText", false, filteredPasteData);
        });
    });
</script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        function checkInputs() {
            var jenisPangan = document.getElementById('jenis_pangan1').value;
            var beratPangan = document.getElementById('berat_pangan1').value;
            var hargaSatuan = document.getElementById('harga_satuan1').value;
            var distributor = document.getElementById('distributor').value;

            // Cek apakah semua inputan telah diisi
            if (jenisPangan && beratPangan && hargaSatuan && distributor) {
                // Jika semua inputan diisi, tampilkan tombol
                document.getElementById('submitBtn').style.display = 'inline-block';
            } else {
                // Jika salah satu inputan kosong, sembunyikan tombol
                document.getElementById('submitBtn').style.display = 'none';
            }
        }

        // Panggil checkInputs setiap kali inputan berubah
        document.getElementById('jenis_pangan1').addEventListener('input', checkInputs);
        document.getElementById('berat_pangan1').addEventListener('input', checkInputs);
        document.getElementById('harga_satuan1').addEventListener('input', checkInputs);
        document.getElementById('distributor').addEventListener('input', checkInputs);

        // Panggil sekali saat halaman dimuat
        checkInputs();
    });
</script>

<script>
    //  menciptakan sistem harus mengisi input jenis_pangan1, berat_pangan1, harga_satuan1
    // secara berurutan

    document.addEventListener('DOMContentLoaded', function() {
        var jenisPangan1 = document.getElementById('jenis_pangan1');
        var beratPangan1 = document.getElementById('berat_pangan1');
        var hargaSatuan1 = document.getElementById('harga_satuan1');

        // Menonaktifkan input untuk berat pangan dan harga satuan pada awalnya
        beratPangan1.disabled = true;
        hargaSatuan1.disabled = true;

        // Fungsi untuk mengaktifkan input berat pangan setelah jenis pangan diisi
        jenisPangan1.addEventListener('input', function() {
            if (jenisPangan1.value.trim() !== '') {
                beratPangan1.disabled = false;
            } else {
                beratPangan1.disabled = true;
                hargaSatuan1.disabled = true;
                alert('Harap isi jenis pangan terlebih dahulu.');
            }
        });

        // Fungsi untuk mengaktifkan input harga satuan setelah berat pangan diisi
        beratPangan1.addEventListener('input', function() {
            if (beratPangan1.value.trim() !== '') {
                hargaSatuan1.disabled = false;
            } else {
                hargaSatuan1.disabled = true;
                alert('Harap isi berat pangan terlebih dahulu.');
            }
        });

        // Fungsi untuk memberikan peringatan jika harga satuan belum diisi saat input berubah
        hargaSatuan1.addEventListener('input', function() {
            if (hargaSatuan1.value.trim() === '') {
                alert('Harap isi harga satuan sebelum melanjutkan.');
            }
        });

        // Fungsi untuk memeriksa semua input sebelum mengizinkan pengiriman form
        document.getElementById('submitBtn').addEventListener('click', function(event) {
            if (jenisPangan1.value.trim() === '' || beratPangan1.value.trim() === '' || hargaSatuan1.value.trim() === '') {
                event.preventDefault(); // Mencegah pengiriman form
                alert('Harap isi semua input secara berurutan.');
            }
        });
    });
</script>