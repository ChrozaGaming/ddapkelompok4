<?php
// Start the session
session_start();

// Include your database configuration file
include '../db/configdb.php';

function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil data dari form dan bersihkan dari input yang berpotensi berbahaya
    $email = isset($_SESSION['email']) ? clean_input($_SESSION['email']) : '';

    // Cek apakah email sudah ada di database
    $sql = "SELECT email FROM pendataan WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $exists = $result->fetch_assoc();

    // Ambil data lain dari form pada page `user/pendataan.php`
    $jenis_pangan = isset($_POST['jenis_pangan']) ? implode(", ", array_map('clean_input', $_POST['jenis_pangan'])) : '';
    $berat_pangan = isset($_POST['berat_pangan']) ? implode(", ", array_map('clean_input', $_POST['berat_pangan'])) : '';
    $harga_pangan = isset($_POST['harga_pangan']) ? clean_input($_POST['harga_pangan']) : '';
    $harga_satuan = isset($_POST['harga_satuan']) ? implode(", ", array_map('clean_input', $_POST['harga_satuan'])) : '';
    $berat = isset($_POST['berat']) ? clean_input($_POST['berat']) : '';
    $distributor = isset($_POST['distributor']) ? clean_input($_POST['distributor']) : '';
    $gps = isset($_POST['gps']) ? clean_input($_POST['gps']) : '';
    $lurah_desa = isset($_POST['lurah_desa']) ? clean_input($_POST['lurah_desa']) : '';
    $totalHarga = isset($_POST['total_harga_hidden']) ? clean_input($_POST['total_harga_hidden']) : 0;

    if ($exists) {
        // Jika email ada, lakukan UPDATE
        $sql = "UPDATE pendataan SET jenis_pangan=?, berat_pangan=?, harga_pangan=?, harga_satuan=?, berat=?, distributor=?, gps=?, lurah_desa=?, total_harga=? WHERE email=?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            die("Kesalahan prepare statement: " . $conn->error);
        }
        $stmt->bind_param("ssssssssds", $jenis_pangan, $berat_pangan, $harga_pangan, $harga_satuan, $berat, $distributor, $gps, $lurah_desa, $totalHarga, $email);
    } else {
        // Jika email tidak ada, lakukan INSERT
        $sql = "INSERT INTO pendataan (jenis_pangan, berat_pangan, harga_pangan, harga_satuan, berat, distributor, gps, lurah_desa, email, total_harga) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            die("Kesalahan prepare statement: " . $conn->error);
        }
        $stmt->bind_param("sssssssssd", $jenis_pangan, $berat_pangan, $harga_pangan, $harga_satuan, $berat, $distributor, $gps, $lurah_desa, $email, $totalHarga);
    }

    if ($stmt->execute()) {
        if ($exists) {
            // Jika melakukan update, tampilkan pesan bahwa data telah diperbarui
            echo "<script>alert('Data untuk email $email berhasil diperbarui.');</script>";
        } else {
            // Jika melakukan insert, tampilkan pesan bahwa data baru telah ditambahkan
            echo "<script>alert('Data baru untuk email $email berhasil ditambahkan.');</script>";
        }
    } else {
        echo "Kesalahan: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>