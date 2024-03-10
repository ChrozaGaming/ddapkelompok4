<?php
include '../db/configdb.php';

session_start(); // Start the session

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lurah_desa = $_POST['lurah_desa'];
    $distributor = $_POST['distributor'];
    $nama_lengkap = $_POST['nama_lengkap'];
    $no_handphone = $_POST['no_handphone'];
    $alamat = $_POST['alamat'];
    $gps = $_POST['gps'];
    $email = $_POST['email'];
    $balai_desa = $_POST['balai_desa'];
    $jenis_pangan_array = $_POST['jenis_pangan'];
    $berat_pangan_array = $_POST['berat_pangan'];

    $jenis_pangan = implode(", ", $jenis_pangan_array);
    $berat_pangan = implode(", ", $berat_pangan_array);

    $sql = "INSERT INTO pengajuanrequest (lurah_desa, distributor, nama_lengkap, no_handphone, alamat, gps, email, balai_desa, jenis_pangan, berat_pangan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", $lurah_desa, $distributor, $nama_lengkap, $no_handphone, $alamat, $gps, $email, $balai_desa, $jenis_pangan, $berat_pangan);
    $stmt->execute();

    $stmt->close();
    $conn->close();

    header('Location: permintaan.php'); // Redirect back to the form page
    exit;
}
?>