<?php
session_start();
include '../db/configdb.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['gps'], $_POST['balai_desa'])) {
        $gps = $_POST['gps'];
        $balai_desa = $_POST['balai_desa'];
        $email = $_SESSION['email']; // Assuming the user's email is stored in the session

        $sql = "UPDATE users SET gps = ?, balai_desa = ? WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $gps, $balai_desa, $email);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo "Location and Balai Desa updated successfully.";
        } else {
            echo "Failed to update location and Balai Desa.";
        }

        $stmt->close();
    }
}
$conn->close();
?>