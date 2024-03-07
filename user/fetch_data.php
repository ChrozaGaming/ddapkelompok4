<?php
include '../db/configdb.php';

$id = $_POST['id'];
$lurah_desa = $_POST['lurah_desa'];

$sql = "SELECT jenis_pangan, berat_pangan, distributor FROM pendataan WHERE id = ? AND lurah_desa = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $id, $lurah_desa);
$stmt->execute();
$result = $stmt->get_result();

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$stmt->close();
$conn->close();
?>