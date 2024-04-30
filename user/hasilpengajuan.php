<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header('Location: login.php');
    exit;
}

$email_pengaju = $_SESSION['email'];

// Menangani permintaan AJAX
if (isset($_POST['status'])) {
    $status = $_POST['status'];
    if ($status == 'Diterima') {
        $query = "SELECT * FROM persetujuan WHERE email_pengaju = ?";
    } else {
        $query = "SELECT * FROM ditolak WHERE email_pengaju = ?";
    }

    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email_pengaju);
    $stmt->execute();
    $result = $stmt->get_result();

    echo "<table class='table'>";
    echo "<thead><tr><th>ID</th><th>Nama Lengkap</th><th>Status</th><th>Detail</th></tr></thead>";
    echo "<tbody>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row['id'] . "</td><td>" . $row['nama_lengkap'] . "</td><td>" . $status . "</td><td><a href='detail.php?id=" . $row['id'] . "'>Lihat Detail</a></td></tr>";
    }
    echo "</tbody></table>";
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hasil Pengajuan</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>
<body>
<div class="container">
    <h1>Hasil Pengajuan</h1>
    <select id="statusDropdown" class="form-control">
        <option value="Diterima">Diterima</option>
        <option value="Ditolak">Ditolak</option>
    </select>
    <div id="tableContainer"></div>
</div>

<script>
$(document).ready(function() {
    $('#statusDropdown').change(function() {
        var status = $(this).val();
        $.post('hasilpengajuan.php', {status: status}, function(data) {
            $('#tableContainer').html(data);
        });
    });

    $('#statusDropdown').trigger('change'); // Trigger change to load initial data
});
</script>
</body>
</html>