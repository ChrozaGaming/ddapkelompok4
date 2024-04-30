<?php
include '../db/configdb.php';

if ($conn === null) {
    die("Connection failed: Unable to connect to the database");
}

header('Content-Type: application/json');

// Mendapatkan jenis pangan dari query string
$jenisPangan = isset($_GET['jenis_pangan']) ? $_GET['jenis_pangan'] : '';

if (!empty($jenisPangan)) {
    // Query untuk mendapatkan harga satuan berdasarkan jenis pangan
    $sql = "SELECT harga_satuan FROM pendataan WHERE jenis_pangan = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("s", $jenisPangan);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            // Mengirimkan harga satuan sebagai respons JSON
            echo json_encode(['harga_satuan' => $row['harga_satuan']]);
        } else {
            // Mengirimkan error jika tidak ada data yang ditemukan
            echo json_encode(['error' => 'No data found for the specified jenis pangan.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['error' => 'Failed to prepare the SQL statement.']);
    }
} else {
    // Mengirimkan error jika jenis pangan tidak diberikan
    echo json_encode(['error' => 'Jenis pangan is required.']);
}

$conn->close();
