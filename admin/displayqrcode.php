<?php
include '../db/configdb.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $email = mysqli_real_escape_string($conn, $_GET['email']);

    // Retrieve the QR Code file path, license key, and user data from the qrcodes table
    $sql = "SELECT q.qrcode, q.license_key, u.namalengkap, u.no_hp, u.alamat, u.email 
        FROM qrcodes q 
        JOIN userrequests u ON q.email = u.email 
        WHERE q.email = '$email'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $qrcode_file = $row['qrcode'];
        $license_key = $row['license_key'];
    } else {
        echo "No record found for this email";
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<div class="container mt-5">
    <div class="text-center">
        <?php if (isset($qrcode_file) && isset($license_key)): ?>
            <h2>QR Code:</h2>
            <img src="<?php echo $qrcode_file; ?>" alt="QR Code" class="img-fluid">
            <h2 class="mt-3">License Key:</h2>
            <p style="color: #FF0000;"><?php echo $license_key; ?></p>
            <table class="table table-bordered mt-3">
                <thead>
                <tr>
                    <th>Nama Lengkap</th>
                    <th>No HP</th>
                    <th>Alamat</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><?php echo $row['namalengkap']; ?></td>
                    <td><?php echo $row['no_hp']; ?></td>
                    <td><?php echo $row['alamat']; ?></td>
                    <td><?php echo $row['email']; ?></td>
                </tr>
                </tbody>
            </table>
        <?php endif; ?>
        <a href="admindashboard" class="btn btn-primary mt-3">Back to Main Menu</a>
        <button onclick="window.print();" class="btn btn-secondary mt-3">Print</button>
    </div>
</div>
</body>
</html>