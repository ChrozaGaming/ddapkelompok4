<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header('Location: login.php');
    exit;
}

$id = $_GET['id'] ?? null;

if (!$id) {
    die("ID tidak ditemukan.");
}

// Mulai transaksi
$conn->begin_transaction();

try {
    // Pilih data dari tabel persetujuan
    $querySelect = "SELECT * FROM persetujuan WHERE id = ?";
    $stmtSelect = $conn->prepare($querySelect);
    $stmtSelect->bind_param("i", $id);
    $stmtSelect->execute();
    $result = $stmtSelect->get_result();
    $data = $result->fetch_assoc();

    if (!$data) {
        throw new Exception("Data tidak ditemukan.");
    }

    // Masukkan data ke tabel riwayatpersetujuan
    $queryInsert = "INSERT INTO riwayatpersetujuan (id, lurah_desa, distributor, nama_lengkap, no_handphone, alamat, gps, email_pengaju, balai_desa, jenis_pangan, berat_pangan, harga_satuan, total_harga, email_desa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmtInsert = $conn->prepare($queryInsert);
    $stmtInsert->bind_param("isssssssssssds", $data['id'], $data['lurah_desa'], $data['distributor'], $data['nama_lengkap'], $data['no_handphone'], $data['alamat'], $data['gps'], $data['email_pengaju'], $data['balai_desa'], $data['jenis_pangan'], $data['berat_pangan'], $data['harga_satuan'], $data['total_harga'], $data['email_desa']);
    $stmtInsert->execute();

    // Hapus data dari tabel persetujuan
    $queryDelete = "DELETE FROM persetujuan WHERE id = ?";
    $stmtDelete = $conn->prepare($queryDelete);
    $stmtDelete->bind_param("i", $id);
    $stmtDelete->execute();

    // Commit transaksi
    $conn->commit();
    echo "Data berhasil dipindahkan ke riwayat persetujuan.";
} catch (Exception $e) {
    $conn->rollback(); // Rollback transaksi jika ada kesalahan
    die("Error: " . $e->getMessage());
}

$conn->close();
