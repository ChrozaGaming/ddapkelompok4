<?php
$conn = include 'db/configdb.php';

if (!isset($_POST['province_id']) || !isset($_POST['gizi_value'])) {
    die("province_id atau gizi_value tidak ditemukan dalam form");
}

$province_id = $_POST['province_id'];
$gizi_value = $_POST['gizi_value'];

$sql = "INSERT INTO GiziData (province_id, gizi_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE gizi_value = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sis", $province_id, $gizi_value, $gizi_value);

if ($stmt->execute()) {
    $affected_rows = $stmt->affected_rows;
    if ($affected_rows > 0) {
        echo "Selamat, Anda telah berhasil mengubah atau menambahkan Data Gizi. $affected_rows row(s) affected.";
    } else {
        echo "No rows were updated.";
    }
} else {
    echo "Error updating record: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>