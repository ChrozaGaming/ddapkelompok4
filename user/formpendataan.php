<?php
// Start the session
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $jenis_pangan = implode(", ", $_POST['jenis_pangan']);
    $berat_pangan = implode(", ", $_POST['berat_pangan']);
    $harga_pangan = implode(", ", $_POST['harga_pangan']); // Added line for harga_pangan
    $berat = $_POST['berat'];
    $distributor = $_POST['distributor'];
    $gps = $_POST['gps'];
    $lurah_desa = $_POST['lurah_desa']; // Get the 'lurah_desa' data from the form data
    $email = $_SESSION['email']; // Get the 'email' data from the session

    $totalHarga = 0;
    for ($i = 0; $i < count($_POST['harga_pangan']); $i++) {
        $totalHarga += $_POST['harga_pangan'][$i] * $_POST['berat_pangan'][$i];
    }


    // Include your database configuration file
    include '../db/configdb.php';

    // Check if the email already exists in the table
    $sql = "SELECT * FROM pendataan WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // If the email already exists, delete the existing row
    if ($result->num_rows > 0) {
        $sql = "DELETE FROM pendataan WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
    }

    $sql = "INSERT INTO pendataan (jenis_pangan, berat_pangan, harga_pangan, berat, distributor, gps, lurah_desa, email, total_harga) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE jenis_pangan=VALUES(jenis_pangan), berat_pangan=VALUES(berat_pangan), harga_pangan=VALUES(harga_pangan), berat=VALUES(berat), distributor=VALUES(distributor), gps=VALUES(gps), lurah_desa=VALUES(lurah_desa), total_harga=VALUES(total_harga)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssd", $jenis_pangan, $berat_pangan, $harga_pangan, $berat, $distributor, $gps, $lurah_desa, $email, $totalHarga);
    if ($stmt->execute()) {
        echo "Data was inserted successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
?>