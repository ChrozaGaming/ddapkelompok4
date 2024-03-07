<?php
include '../db/configdb.php'; // Include your database configuration file

$sql = "SELECT DISTINCT berat_pangan FROM pendataan";
$result = $conn->query($sql);

$beratPanganData = [];
while ($row = $result->fetch_assoc()) {
    $beratPanganData[] = $row['berat_pangan'];
}

echo json_encode($beratPanganData);

$conn->close();
?>