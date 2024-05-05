<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header('Location: login.php');
    exit;
}

$email = $_SESSION['email'];

// Query untuk mendapatkan data dari tabel riwayatpersetujuan berdasarkan email_desa
$query = "SELECT * FROM riwayatpersetujuan WHERE email_desa = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Riwayat Persetujuan</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>

<body>
    <div class="container mt-5">
        <h2>Riwayat Persetujuan</h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Lurah Desa</th>
                    <th>Distributor</th>
                    <th>Nama Lengkap</th>
                    <th>No Handphone</th>
                    <th>Alamat</th>
                    <th>GPS</th>
                    <th>Email Pengaju</th>
                    <th>Balai Desa</th>
                    <th>Jenis Pangan</th>
                    <th>Berat Pangan</th>
                    <th>Harga Satuan</th>
                    <th>Total Harga</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = $result->fetch_assoc()) : ?>
                    <tr>
                        <td><?php echo $row['id']; ?></td>
                        <td><?php echo htmlspecialchars($row['lurah_desa']); ?></td>
                        <td><?php echo htmlspecialchars($row['distributor']); ?></td>
                        <td><?php echo htmlspecialchars($row['nama_lengkap']); ?></td>
                        <td><?php echo htmlspecialchars($row['no_handphone']); ?></td>
                        <td><?php echo htmlspecialchars($row['alamat']); ?></td>
                        <td><?php echo htmlspecialchars($row['gps']); ?></td>
                        <td><?php echo htmlspecialchars($row['email_pengaju']); ?></td>
                        <td><?php echo htmlspecialchars($row['balai_desa']); ?></td>
                        <td><?php echo htmlspecialchars($row['jenis_pangan']); ?></td>
                        <td><?php echo htmlspecialchars($row['berat_pangan']); ?></td>
                        <td>
                            <?php
                            // Memisahkan string jika ada lebih dari satu harga satuan
                            $harga_satuan = explode(',', $row['harga_satuan']);
                            foreach ($harga_satuan as $harga) {
                                echo number_format((float)$harga, 2) . "<br>";
                            }
                            ?>
                        </td>
                        <td><?php echo number_format((float)$row['total_harga'], 2); ?></td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>
</body>

</html>