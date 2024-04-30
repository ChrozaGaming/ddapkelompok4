<?php

session_start();

include '../db/configdb.php';

if ($conn === null) {
    die("Connection failed: Unable to connect to the database");
}

// Mengambil data dari POST
$email_pengaju = $_SESSION['email'];
$email_tujuan = $_POST['email_tujuan'] ?? '';
$lurah_desa = $_POST['lurah_desa'] ?? '';
$gps = $_POST['gps'] ?? '';
$distributor = $_POST['distributor'] ?? '';
$nama_lengkap = $_POST['nama_lengkap'] ?? '';
$no_handphone = $_POST['no_handphone'] ?? '';
$alamat = $_POST['alamat'] ?? '';
$balai_desa = $_POST['balai_desa'] ?? '';
$jenis_pangan = isset($_POST['jenis_pangan']) ? implode(', ', $_POST['jenis_pangan']) : '';
$berat_pangan = $_POST['berat_pangan'] ?? [];
$harga_satuan = $_POST['harga_satuan'] ?? [];
$total_harga = $_POST['total_harga'] ?? 0;
$subtotals = $_POST['subtotal'] ?? [];

// Menyimpan hasil implode ke dalam variabel
$berat_pangan_imploded = implode(', ', $berat_pangan);
$harga_satuan_imploded = implode(', ', $harga_satuan);
$subtotal_imploded = implode(', ', $subtotals);

// Query untuk menyimpan data
$sql = "INSERT INTO pengajuanrequest (email_pengaju, email_tujuan, lurah_desa, gps, distributor, nama_lengkap, no_handphone, alamat, balai_desa, jenis_pangan, berat_pangan, harga_satuan, total_harga, subtotals) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die('MySQL prepare error: ' . $conn->error);
}

$total_harga = 0;
if (!empty($berat_pangan) && !empty($harga_satuan)) {
    foreach ($berat_pangan as $jenis => $berat) {
        if (isset($harga_satuan[$jenis])) {
            $harga = $harga_satuan[$jenis];
            $subtotal = $berat * $harga;
            $subtotals[$jenis] = $subtotal;
            $total_harga += $subtotal;  // Menambahkan subtotal ke total_harga
        }
    }
}
$subtotal_imploded = implode(', ', $subtotals);

$stmt->bind_param("ssssssssssssss", $email_pengaju, $email_tujuan, $lurah_desa, $gps, $distributor, $nama_lengkap, $no_handphone, $alamat, $balai_desa, $jenis_pangan, $berat_pangan_imploded, $harga_satuan_imploded, $total_harga, $subtotal_imploded);
$stmt->execute();


if ($stmt->affected_rows === 1) {
    echo "Pengajuan berhasil disimpan.";
} else {
    echo "Gagal menyimpan pengajuan.";
}

$stmt->close();
$conn->close();
