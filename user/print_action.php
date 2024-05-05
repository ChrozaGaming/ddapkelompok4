<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header('Location: login.php');
    exit;
}

$id = $_GET['id'] ?? null;

if (!$id) {
    die("ID tidak ditemukan.");
}

$query = "SELECT * FROM persetujuan WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if (!$row) {
    die("Data tidak ditemukan.");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
    <title>Print Data</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #fff;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>

<body>
    <h1 style="text-align: center;">Detail Persetujuan</h1>
    <h3 style="text-align: center;">Surat Jalan</h3>
    <table>
        <tr>
            <th>Desa Anda</th>
            <td><?php echo htmlspecialchars($row['lurah_desa']); ?></td>
        </tr>
        <tr>
            <th>Distributor</th>
            <td><?php echo htmlspecialchars($row['distributor']); ?></td>
        </tr>
        <tr>
            <th>Nama Lengkap</th>
            <td><?php echo htmlspecialchars($row['nama_lengkap']); ?></td>
        </tr>
        <tr>
            <th>No Handphone</th>
            <td><?php echo htmlspecialchars($row['no_handphone']); ?></td>
        </tr>
        <tr>
            <th>Alamat</th>
            <td><?php echo htmlspecialchars($row['alamat']); ?></td>
        </tr>
        <tr>
            <th>Google Maps</th>
            <td><a href="https://www.google.com/maps/search/?api=1&query=<?php echo urlencode(htmlspecialchars($row['balai_desa'])); ?>" target="_blank">Buka di Google Maps</a></td>
        </tr>
        <tr>
            <th>Email</th>
            <td><?php echo htmlspecialchars($row['email_pengaju']); ?></td>
        </tr>
        <tr>
            <th>Tujuan</th>
            <td><?php echo htmlspecialchars($row['balai_desa']); ?></td>
        </tr>
        <tr>
            <th>Jenis Pangan</th>
            <td>
                <?php
                $jenis_pangan = explode(',', $row['jenis_pangan']);
                $berat_pangan = explode(',', $row['berat_pangan']);
                $harga_satuan = explode(',', $row['harga_satuan']);
                foreach ($jenis_pangan as $index => $jenis) {
                    echo htmlspecialchars($jenis) . " " . htmlspecialchars($berat_pangan[$index]) . " TON - Rp " . number_format($harga_satuan[$index], 0, '', ',') . "<br>";
                }
                ?>
            </td>
            </th>
        </tr>
        <tr>
            <th>Total Harga</th>
            <td><?php echo number_format($row['total_harga'], 0, '', ','); ?></td>
        </tr>
    </table>
    <button onclick="window.print();">Print this page</button>
    <!-- <button onclick="downloadPDF();">Download as PDF</button> -->
    <script>
        function downloadPDF() {
            var element = document.getElementById('content-to-print'); // Pastikan ini adalah ID dari elemen yang ingin Anda cetak
            var opt = {
                margin: 1,
                filename: 'detail-persetujuan.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 2
                },
                jsPDF: {
                    unit: 'in',
                    format: 'letter',
                    orientation: 'portrait'
                }
            };

            // Gunakan html2pdf() untuk mengonversi elemen
            html2pdf().set(opt).from(element).save();
        }
    </script>
</body>



</html>