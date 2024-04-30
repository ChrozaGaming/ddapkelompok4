<?php
include '../db/configdb.php';

header('Content-Type: application/json'); // Set header response ke JSON

$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id !== null) {
    // Query untuk mengambil berat pangan dan harga satuan berdasarkan ID
    $sql = "SELECT jenis_pangan, berat_pangan, harga_satuan FROM pendataan WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    if ($data) {
        // Mengirimkan data berat pangan dan harga satuan sebagai JSON
        echo json_encode([
            'jenis_pangan' => $data['jenis_pangan'],
            'berat_pangan' => $data['berat_pangan'],
            'harga_satuan' => $data['harga_satuan']
        ]);
    } else {
        echo json_encode(['error' => 'No data found for the given id.']);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'No id provided.']);
}

$conn->close();
