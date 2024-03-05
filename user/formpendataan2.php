<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    // Redirect to login page
    header('Location: login.php');
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lurah_desa2 = mysqli_real_escape_string($conn, $_POST['lurah_desa2']);
    $jenis_pangan2 = implode(", ", $_POST['jenis_pangan2']); // handle jenis_pangan as an array
    $jenis_pangan2 = mysqli_real_escape_string($conn, $jenis_pangan2);
    $berat_pangan2 = implode(", ", $_POST['berat_pangan2']);
    $berat_pangan2 = mysqli_real_escape_string($conn, $berat_pangan2);
    $berat2 = mysqli_real_escape_string($conn, $_POST['berat2']);
    $distributor2 = mysqli_real_escape_string($conn, $_POST['distributor2']);
    $gps2 = mysqli_real_escape_string($conn, $_POST['gps2']);

    // Retrieve the email from the session
    $email2 = $_SESSION['email'];

    $sql2 = "INSERT INTO pendataan2 (lurah_desa, jenis_pangan, berat_pangan, berat, distributor, gps, email)
        VALUES ('$lurah_desa2', '$jenis_pangan2', '$berat_pangan2', '$berat2', '$distributor2', '$gps2', '$email2')";

    if ($conn->query($sql2) === TRUE) {
        $_SESSION['message'] = "Data berhasil disimpan.";
    } else {
        echo "Error: " . $sql2 . "<br>" . $conn->error;
    }

    // Redirect ke halaman yang sama
    header("Location: formpendataan2");
    exit;
}
?>