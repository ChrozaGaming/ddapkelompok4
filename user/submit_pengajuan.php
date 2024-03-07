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
    $jenis_pangan = $_POST['jenis_pangan'];
    $berat_pangan = $_POST['berat_pangan'];

    $sql = "INSERT INTO pengajuanrequest (lurah_desa, distributor, nama_lengkap, no_handphone, alamat, gps, email, balai_desa, jenis_pangan, berat_pangan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    for ($i = 0; $i < count($jenis_pangan); $i++) {
        $stmt->bind_param("ssssssssss", $lurah_desa, $distributor, $nama_lengkap, $no_handphone, $alamat, $gps, $email, $balai_desa, $jenis_pangan[$i], $berat_pangan[$i]);
        $stmt->execute();
    }

    $stmt->close();
    $conn->close();

    header('Location: permintaan.php'); // Redirect back to the form page
    exit;
}
?><?php
