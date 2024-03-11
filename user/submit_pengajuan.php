<?php
include '../db/configdb.php';

$conn = new mysqli($servername, $username, $password, $dbname); // Define the $conn variable

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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

    // Fetch the email from the balai_desa table
    $sql = "SELECT email FROM balai_desa WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $balai_desa);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $email_balaidesa_tujuan = $row['email'];
    } else {
        // Handle the case where the SQL query does not return any results
        // For example, you can set a default value to the email_balaidesa_tujuan
        $email_balaidesa_tujuan = "default_email@example.com";
    }

    // Check if the $_POST['email_balaidesa_tujuan'] is set and is not null
    if (isset($_POST['email_balaidesa_tujuan']) && !empty($_POST['email_balaidesa_tujuan'])) {
        $email_balaidesa_tujuan = $_POST['email_balaidesa_tujuan'];
    }

    // Modify the INSERT statement to include the email_balaidesa_tujuan column
    $sql = "INSERT INTO pengajuanrequest (lurah_desa, distributor, nama_lengkap, no_handphone, alamat, gps, email, balai_desa, jenis_pangan, berat_pangan, email_balaidesa_tujuan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssssss", $lurah_desa, $distributor, $nama_lengkap, $no_handphone, $alamat, $gps, $email, $balai_desa, $jenis_pangan, $berat_pangan, $email_balaidesa_tujuan);
    $stmt->execute();

    $conn->close();

    header('Location: permintaan.php'); // Redirect back to the form page
    exit;
}
?>