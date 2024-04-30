<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    echo 0;
    exit;
}

$email = $_SESSION['email'];
$sql = "SELECT * FROM pengajuanrequest WHERE email_tujuan = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
if ($stmt->execute()) {
    $result = $stmt->get_result();
} else {
    echo 0;
    exit;
}

echo mysqli_num_rows($result);
?>