<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    // Redirect to login page
    header('Location: login.php');
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lurah_desa = mysqli_real_escape_string($conn, $_POST['lurah_desa']);
    $jenis_pangan = implode(", ", $_POST['jenis_pangan']); // handle jenis_pangan as an array
    $jenis_pangan = mysqli_real_escape_string($conn, $jenis_pangan);
    $berat_pangan = implode(", ", $_POST['berat_pangan']);
    $berat_pangan = mysqli_real_escape_string($conn, $berat_pangan);
    $berat = mysqli_real_escape_string($conn, $_POST['berat']);
    $distributor = mysqli_real_escape_string($conn, $_POST['distributor']);
    $gps = mysqli_real_escape_string($conn, $_POST['gps']);

    // Retrieve the email from the session
    $email = $_SESSION['email'];

    $sql = "INSERT INTO pendataan (lurah_desa, jenis_pangan, berat_pangan, berat, distributor, gps, email)
        VALUES ('$lurah_desa', '$jenis_pangan', '$berat_pangan', '$berat', '$distributor', '$gps', '$email')";

    if ($conn->query($sql) === TRUE) {
        $_SESSION['message'] = "Data berhasil disimpan.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Redirect ke halaman yang sama
    header("Location: pendataan");
    exit;
}
?>