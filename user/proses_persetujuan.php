<?php
session_start();
include '../db/configdb.php';

if (!isset($_GET['id'])) {
    die("Tidak ada ID yang diberikan.");
}

$id = $_GET['id'];
$emailDesa = $_SESSION['email'];

// Mengambil data dari tabel pengajuanrequest
$sqlPengajuan = "SELECT * FROM pengajuanrequest WHERE id = ?";
$stmtPengajuan = $conn->prepare($sqlPengajuan);
$stmtPengajuan->bind_param("i", $id);
$stmtPengajuan->execute();
$resultPengajuan = $stmtPengajuan->get_result();
$rowPengajuan = $resultPengajuan->fetch_assoc();

if (!$rowPengajuan) {
    die("Data pengajuan tidak ditemukan.");
}

// Menyimpan data ke tabel persetujuan
$insertSql = "INSERT INTO persetujuan (lurah_desa, distributor, nama_lengkap, no_handphone, alamat, gps, email_pengaju, balai_desa, jenis_pangan, berat_pangan, harga_satuan, total_harga, email_desa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$insertStmt = $conn->prepare($insertSql);
$insertStmt->bind_param("sssssssssssss", $rowPengajuan['lurah_desa'], $rowPengajuan['distributor'], $rowPengajuan['nama_lengkap'], $rowPengajuan['no_handphone'], $rowPengajuan['alamat'], $rowPengajuan['gps'], $rowPengajuan['email_pengaju'], $rowPengajuan['balai_desa'], $rowPengajuan['jenis_pangan'], $rowPengajuan['berat_pangan'], $rowPengajuan['harga_satuan'], $rowPengajuan['total_harga'], $emailDesa);
$insertStmt->execute();

if ($insertStmt->affected_rows === 1) {
    // Hapus data dari pengajuanrequest setelah berhasil disimpan ke persetujuan
    $deleteSql = "DELETE FROM pengajuanrequest WHERE id = ?";
    $deleteStmt = $conn->prepare($deleteSql);
    $deleteStmt->bind_param("i", $id);
    $deleteStmt->execute();

    if ($deleteStmt->affected_rows === 1) {
        // Mengurai berat_pangan yang di-implode dari pengajuanrequest
        $beratPanganPengajuan = explode(',', $rowPengajuan['berat_pangan']);

        // Mengambil dan mengurai berat_pangan dari tabel pendataan
        $sqlPendataan = "SELECT berat_pangan FROM pendataan WHERE email = ?";
        $stmtPendataan = $conn->prepare($sqlPendataan);
        $stmtPendataan->bind_param("s", $emailDesa);
        $stmtPendataan->execute();
        $resultPendataan = $stmtPendataan->get_result();
        $rowPendataan = $resultPendataan->fetch_assoc();

        if (!$rowPendataan) {
            die("Data pendataan tidak ditemukan.");
        }

        $beratPanganPendataan = explode(',', $rowPendataan['berat_pangan']);

        // Menghitung perbedaan berat
        $beratPanganBaru = array();
        foreach ($beratPanganPendataan as $index => $berat) {
            $beratPanganBaru[] = max(0, $berat - ($beratPanganPengajuan[$index] ?? 0));
        }

        // Update berat_pangan di tabel pendataan
        $beratPanganBaruImploded = implode(',', $beratPanganBaru);
        $updateSql = "UPDATE pendataan SET berat_pangan = ? WHERE email = ?";
        $updateStmt = $conn->prepare($updateSql);
        $updateStmt->bind_param("ss", $beratPanganBaruImploded, $emailDesa);
        $updateStmt->execute();

        if ($updateStmt->affected_rows === 1) {
            echo "Data pendataan berhasil diperbarui.";
        } else {
            echo "Gagal memperbarui data pendataan.";
        }
        $updateStmt->close();
    } else {
        echo "Persetujuan berhasil disimpan, namun gagal menghapus data pengajuan.";
    }
    $deleteStmt->close();
} else {
    echo "Gagal menyimpan persetujuan.";
}
$insertStmt->close();
$conn->close();
