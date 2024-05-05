<?php
session_start();
include '../db/configdb.php';

if ($conn === null) {
    die("Connection failed: Unable to connect to the database");
}

echo "Total Harga yang diterima: <br>" . $_POST['total_harga'];


$email_pengaju = $_SESSION['email'];
$email_tujuan = $_POST['email_tujuan'] ?? '';
$lurah_desa = $_POST['lurah_desa'] ?? 'Nilai default jika tidak ada'; 
$gps = $_POST['gps'] ?? '';
$distributor = $_POST['distributor'] ?? '';
$nama_lengkap = $_POST['nama_lengkap'] ?? '';
$no_handphone = $_POST['no_handphone'] ?? '';
$alamat = $_POST['alamat'] ?? '';
$balai_desa = $_POST['balai_desa'] ?? '';
$jenis_pangan = isset($_POST['jenis_pangan']) ? implode(', ', $_POST['jenis_pangan']) : '';
$berat_pangan = $_POST['berat_pangan'] ?? [];
$harga_satuan = $_POST['harga_satuan'] ?? [];
$total_harga = $_POST['total_harga'] ?? '0';
$total_harga = str_replace(['Rp ', ','], '', $total_harga); // Menghapus format mata uang
$total_harga = floatval($total_harga); // Konversi ke float
$subtotals = $_POST['subtotal'] ?? [];

$berat_pangan_imploded = implode(', ', $berat_pangan);
$harga_satuan_imploded = implode(', ', $harga_satuan);
$subtotal_imploded = implode(', ', $subtotals);

$sql = "INSERT INTO pengajuanrequest (email_pengaju, email_tujuan, lurah_desa, gps, distributor, nama_lengkap, no_handphone, alamat, balai_desa, jenis_pangan, berat_pangan, harga_satuan, total_harga, subtotals) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die('MySQL prepare error: ' . $conn->error);
}

$stmt->bind_param("ssssssssssssss", $email_pengaju, $email_tujuan, $lurah_desa, $gps, $distributor, $nama_lengkap, $no_handphone, $alamat, $balai_desa, $jenis_pangan, $berat_pangan_imploded, $harga_satuan_imploded, $total_harga, $subtotal_imploded);
if (!$stmt->execute()) {
    echo "Execute error: " . $stmt->error;
} else {
    if ($stmt->affected_rows === 1) {
        header("Location: userdashboard.php");
        exit;
    } else {
        echo "Gagal menyimpan pengajuan.";
    }
}

$stmt->close();
$conn->close();
?>