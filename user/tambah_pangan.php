<?php
session_start();
include '../db/configdb.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lurah_desa = mysqli_real_escape_string($conn, $_POST['lurah_desa']);
    $jenis_pangan = mysqli_real_escape_string($conn, $_POST['jenis_pangan']);
    $berat = mysqli_real_escape_string($conn, $_POST['berat']);
    $distributor = mysqli_real_escape_string($conn, $_POST['distributor']);
    $gps = mysqli_real_escape_string($conn, $_POST['gps']);

    $sql = "INSERT INTO informasipangan (lurah_desa, jenis_pangan, berat, distributor, gps)
        VALUES ('$lurah_desa', '$jenis_pangan', '$berat', '$distributor', '$gps')";

    if ($conn->query($sql) === TRUE) {
        $_SESSION['message'] = "Selamat data anda telah kami kirimkan";
        header("Location: pendataan.php");
        exit;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>