<?php
include '../db/configdb.php';

$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id !== null) {
    $sql = "SELECT berat_pangan FROM pendataan WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if ($row) {
        $beratPanganArray = explode(',', $row['berat_pangan']);
        $totalBeratPangan = array_sum(array_map('floatval', $beratPanganArray));
        echo $totalBeratPangan;
    } else {
        echo "No data found for the given id.";
    }

    $stmt->close();
} else {
    echo "No id provided.";
}

$conn->close();
?>