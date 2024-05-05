<?php
ob_start(); // Start buffering output
session_start();

include '../db/configdb.php';

header('Content-Type: application/json');

if (!isset($_SESSION['email'])) {
    echo json_encode(['error' => true, 'message' => 'User not logged in']);
    exit;
}

if (!isset($_GET['id']) || !isset($_GET['keterangan'])) {
    echo json_encode(['error' => true, 'message' => 'ID atau alasan tidak diberikan.']);
    exit;
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
        echo json_encode(['success' => true, 'message' => 'Pengajuan berhasil ditolak dan dipindahkan.']);
    } else {
        echo json_encode(['error' => true, 'message' => 'Gagal menghapus pengajuan.']);
    }
    $stmtDelete->close();
} else {
    echo json_encode(['error' => true, 'message' => 'Gagal memindahkan pengajuan.']);
}

$conn->close();