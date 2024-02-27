<?php
include '../db/configdb.php';
include '../phpqrcode/qrlib.php'; // Include the QR Code library

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST['email']);

    // Generate a license key
    $license_key = bin2hex(random_bytes(32)); // This will generate a 64 characters long license key

    // Create a QR Code
    $qrcode_file = 'qrcodes/' . $email . '.png';
    QRcode::png($license_key, $qrcode_file, QR_ECLEVEL_H, 10);

    // Insert the QR Code file path and license key into the qrcodes table
    $sql = "INSERT INTO qrcodes (email, qrcode, license_key) VALUES ('$email', '$qrcode_file', '$license_key')";
    if ($conn->query($sql) !== TRUE) {
        echo "Error inserting record: " . $conn->error;
        $conn->close();
        return;
    }

    header("Location: displayqrcode.php?email=" . urlencode($email));
    exit;

}

$conn->close();
?>