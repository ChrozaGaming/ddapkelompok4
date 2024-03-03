<?php
// Koneksi ke database
$db = new mysqli('localhost', 'root', '', 'ddap4gizi');

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

// Mengambil data dari form
$lurah_desa = $_POST['lurah_desa2'];
$jenis_pangan = implode(',', $_POST['jenis_pangan2']);
$berat_pangan = implode(',', $_POST['berat_pangan2']);
$berat = floatval($_POST['berat2']); // Convert berat to float
$distributor = $_POST['distributor2'];
$gps = $_POST['gps2'];

// Menyimpan data ke database
$sql = "INSERT INTO pendataan2 (lurah_desa, jenis_pangan, berat_pangan, berat, distributor, gps) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $db->prepare($sql);
$stmt->bind_param("ssssss", $lurah_desa, $jenis_pangan, $berat_pangan, $berat, $distributor, $gps);

if ($stmt->execute()) {
    echo "Data berhasil disimpan";
} else {
    echo "Error: " . $stmt->error;
    echo "DB Error: " . $db->error;
}

$stmt->close();
$db->close();
?>