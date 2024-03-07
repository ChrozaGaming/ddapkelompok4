<?php
include '../db/configdb.php';

session_start(); // Start the session

$id = isset($_GET['id']) ? $_GET['id'] : null;
$lurah_desa = isset($_GET['lurah_desa']) ? urldecode($_GET['lurah_desa']) : null;

$sql = "SELECT distributor, jenis_pangan, berat_pangan FROM pendataan WHERE id = ? AND lurah_desa = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $id, $lurah_desa);
$stmt->execute();
$result = $stmt->get_result();

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$sql = "SELECT balai_desa FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $_SESSION['email']);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$balai_desa = $user['balai_desa'];

$sql = "SELECT namalengkap, no_hp, alamat, gps FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $_SESSION['email']);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$nama_lengkap = $user['namalengkap'];
$no_handphone = $user['no_hp'];
$alamat = $user['alamat'];
$gps = $user['gps'];


$stmt->close();
$conn->close();
?>



<!DOCTYPE html>
<html>
<head>
    <title>Pengajuan</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            document.getElementById('addButton').addEventListener('click', function() {
                document.getElementById('submitBtn').style.display = 'block';
            });
        });
    </script>
    <style>
        #submitBtn {
            display: none;
        }
    </style>
</head>
<body>
<div class="container">
    <h2 class="my-3">Pengajuan</h2>
    <form action="submit_pengajuan.php?id=<?php echo $id; ?>&email=<?php echo urlencode($_SESSION['email']); ?>" method="post">
        <div class="form-group">
            <label for="lurah_desa">Pengajuan Balai Desa:</label>
            <input type="text" id="lurah_desa" name="lurah_desa" class="form-control" value="<?php echo $lurah_desa; ?>" readonly>
        </div>
        <div class="form-group">
            <label for="distributor">Distributor:</label>
            <select id="distributor" name="distributor" class="form-control">
                <?php foreach ($data as $row): ?>
                    <option value="<?php echo $row['distributor']; ?>"><?php echo $row['distributor']; ?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <hr> <!-- Pembatas -->
        <h3>Identitas Pengaju</h3> <!-- Judul -->

        <div class="form-group">
            <label for="nama_lengkap">Nama Lengkap:</label>
            <input type="text" id="nama_lengkap" name="nama_lengkap" class="form-control" value="<?php echo $nama_lengkap; ?>" readonly>
        </div>

        <div class="form-group">
            <label for="no_handphone">No Handphone:</label>
            <input type="text" id="no_handphone" name="no_handphone" class="form-control" value="<?php echo $no_handphone; ?>" readonly>
        </div>

        <div class="form-group">
            <label for="alamat">Alamat:</label>
            <input type="text" id="alamat" name="alamat" class="form-control" value="<?php echo $alamat; ?>" readonly>
        </div>

        <div class="form-group">
            <label for="gps">GPS:</label>
            <input type="text" id="gps" name="gps" class="form-control" value="<?php echo $gps; ?>" readonly>
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" class="form-control" value="<?php echo $_SESSION['email']; ?>" readonly>
        </div>
        <div class="form-group">
            <label for="balai_desa">Asal Balai Desa:</label>
            <input type="text" id="balai_desa" name="balai_desa" class="form-control" value="<?php echo $balai_desa; ?>" readonly>
        </div>
        <h3>Data Diajukan</h3>
        <div id="dynamicFields"></div>
        <div style="display: flex; flex-direction: row;">
            <button type="button" id="addButton" class="btn btn-success mt-4" style="margin-right: 1mm;">Tambah</button>
            <button type="button" id="hapusButton" class="btn btn-danger mt-4" style="margin-right: 1mm;" onclick="if(confirm('Apakah anda setuju untuk mereset dan menghapus semua data?')) location.reload();">Reset</button>
            <button type="submit" id="submitBtn" class="btn btn-primary mt-4">Submit</button>
        </div>
    </form>
</div>
<script>
    var addButton = document.getElementById('addButton');
    var undoButton = document.getElementById('undoButton');
    var dynamicFields = document.getElementById('dynamicFields');
    var jenisPanganCount = <?php echo count(explode(',', $data[0]['jenis_pangan'])); ?>;
    var addedFields = 0;

    document.querySelector('form').addEventListener('submit', function(event) {
        var beratPanganInput = document.querySelectorAll('input[name="berat_pangan[]"]');
        var totalBeratPangan = 0;
        beratPanganInput.forEach(function(input) {
            totalBeratPangan += Number(input.value);
        });

        var maxBeratPangan = <?php echo $data[0]['berat_pangan']; ?>; // asumsikan $data[0]['berat_pangan'] adalah total berat pangan maksimum

        if (totalBeratPangan > maxBeratPangan) {
            event.preventDefault(); // mencegah form disubmit
            alert('Total berat pangan tidak boleh melebihi ' + maxBeratPangan + ' ton.');
        }
    });

    addButton.addEventListener('click', function() {
        if (addedFields < jenisPanganCount) {
            var newRow = document.createElement('div');
            newRow.className = 'row';

            var newFormGroup1 = document.createElement('div');
            newFormGroup1.className = 'form-group col-md-5';
            var newLabel1 = document.createElement('label');
            newLabel1.textContent = 'Jenis Pangan ' + (addedFields + 1) + ':';
            var newSelect = document.createElement('select');
            newSelect.id = 'jenis_pangan' + addedFields;
            newSelect.name = 'jenis_pangan[]';
            newSelect.className = 'form-control';

            var jenisPanganArray = <?php echo json_encode(explode(',', $data[0]['jenis_pangan'])); ?>;
            for (var i = 0; i < jenisPanganArray.length; i++) {
                var newOption = document.createElement('option');
                newOption.value = jenisPanganArray[i];
                newOption.textContent = jenisPanganArray[i];
                newSelect.appendChild(newOption);
            }

            newSelect.selectedIndex = addedFields;

            newFormGroup1.appendChild(newLabel1);
            newFormGroup1.appendChild(newSelect);

            newSelect.addEventListener('change', updateOptions);

            var newFormGroup2 = document.createElement('div');
            newFormGroup2.className = 'form-group col-md-5 ml-1';
            var newLabel2 = document.createElement('label');
            newLabel2.textContent = 'Berat Pangan ' + (addedFields + 1) + ':' + ' (TON) ';
            var newInput = document.createElement('input');
            newInput.type = 'number';
            newInput.id = 'berat_pangan' + addedFields;
            newInput.name = 'berat_pangan[]';
            newInput.className = 'form-control';
            newFormGroup2.appendChild(newLabel2);
            newFormGroup2.appendChild(newInput);

            newRow.appendChild(newFormGroup1);
            newRow.appendChild(newFormGroup2);
            dynamicFields.appendChild(newRow);

            addedFields++;
            setTimeout(updateOptions, 0);
        }
        if (addedFields >= jenisPanganCount) {
            addButton.disabled = true;
        }
    });

    undoButton.addEventListener('click', function() {
        if (addedFields > 0) {
            dynamicFields.removeChild(dynamicFields.lastChild);
            addedFields--;
            updateOptions();
        }
    });


    function updateOptions() {
        var selectedOptions = [];
        for (var i = 0; i < addedFields; i++) {
            var select = document.getElementById('jenis_pangan' + i);
            if (select.value) {
                selectedOptions.push(select.value);
            }
        }
        for (var i = 0; i < addedFields; i++) {
            var select = document.getElementById('jenis_pangan' + i);
            var options = Array.from(select.options);
            options.forEach(function(option) {
                if (selectedOptions.includes(option.value) && select.value != option.value) {
                    select.removeChild(option);
                }
            });
        }
    }
</script>
</body>
</html>