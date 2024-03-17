<?php
include '../db/configdb.php';

$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id !== null) {
    $sql = "SELECT jenis_pangan, berat_pangan FROM pendataan WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if ($row) {
        $jenisPanganArray = explode(',', $row['jenis_pangan']);
        $beratPanganArray = explode(',', $row['berat_pangan']);
        $data = array_combine($jenisPanganArray, $beratPanganArray);
        echo json_encode($data);
    } else {
        echo "No data found for the given id.";
    }

    $stmt->close();
} else {
    echo "No id provided.";
}

$conn->close();
?>