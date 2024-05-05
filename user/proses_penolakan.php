<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header('Location: login.php');
    exit;
}

if (!isset($_GET['id']) || !isset($_GET['keterangan'])) {
    die("ID atau alasan tidak diberikan.");
}

$id = $_GET['id'];
$keterangan = $_GET['keterangan'];

// Memindahkan data ke tabel penolakan dengan keterangan
$sqlInsert = "INSERT INTO penolakan (id, lurah_desa, distributor, nama_lengkap, no_handphone, alamat, gps, email_pengaju, balai_desa, jenis_pangan, berat_pangan, harga_satuan, total_harga, keterangan)
               SELECT id, lurah_desa, distributor, nama_lengkap, no_handphone, alamat, gps, email_pengaju, balai_desa, jenis_pangan, berat_pangan, harga_satuan, total_harga, ? FROM pengajuanrequest WHERE id = ?";
$stmtInsert = $conn->prepare($sqlInsert);
$stmtInsert->bind_param("si", $keterangan, $id);
$moveSuccessful = $stmtInsert->execute();
$stmtInsert->close();

if ($moveSuccessful) {
    // Menghapus data dari tabel pengajuanrequest
    $sqlDelete = "DELETE FROM pengajuanrequest WHERE id = ?";
    $stmtDelete = $conn->prepare($sqlDelete);
    $stmtDelete->bind_param("i", $id);
    if ($stmtDelete->execute()) {
        echo "<script>alert('Pengajuan berhasil ditolak dan dipindahkan.'); window.location.href='userdashboard.php';</script>";
    } else {
        echo "<script>alert('Gagal menghapus pengajuan.'); window.location.href='userdashboard.php';</script>";
    }
    $stmtDelete->close();
} else {
    echo "<script>alert('Gagal memindahkan pengajuan.'); window.location.href='userdashboard.php';</script>";
}

$conn->close();
