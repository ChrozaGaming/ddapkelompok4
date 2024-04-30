<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header('Location: login.php');
    exit;
}

if (!isset($_GET['id'])) {
    die("ID tidak diberikan.");
}

$id = $_GET['id'];

// Mengambil data dari database
$sql = "SELECT * FROM persetujuan WHERE id = ?";
$stmt = $conn->prepare($sql);
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
    <title>Detail Pengajuan</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"></script>
</head>

<body>
    <div class="container">
        <h1>Detail Pengajuan</h1>
        <table class="table">
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
                <td><a href="https://www.google.com/maps/search/?api=1&query=<?php echo urlencode($row['gps']); ?>" target="_blank">Buka di Google Maps</a></td>
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
                <th>Pangan</th>
                <td><?php echo htmlspecialchars($row['jenis_pangan']); ?></td>
            </tr>
            <tr>
                <th>Harga Satuan</th>
                <td><?php echo htmlspecialchars($row['harga_satuan']); ?></td>
            </tr>
            <tr>
                <th>Total Harga</th>
                <td><?php echo number_format($row['total_harga'], 0, '', ','); ?></td>
            </tr>
        </table>
        <button onclick="window.print();" class="btn btn-primary">Print Halaman Ini</button>
        <button id="download-pdf" class="btn btn-success">Download sebagai PDF</button>

        <script>
            document.getElementById('download-pdf').addEventListener('click', function() {
                const {
                    jsPDF
                } = window.jspdf;
                const doc = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a3'
                });

                // Menambahkan judul
                doc.setFontSize(18);
                doc.text("Detail Pengajuan", 14, 20);

                // Membuat tabel
                const headers = [["Kategori", "Informasi"]];
                const data = [
                    ["Desa Anda", "<?php echo $row['lurah_desa']; ?>"],
                    ["Distributor", "<?php echo $row['distributor']; ?>"],
                    ["Nama Lengkap", "<?php echo $row['nama_lengkap']; ?>"],
                    ["No Handphone", "<?php echo $row['no_handphone']; ?>"],
                    ["Alamat", "<?php echo $row['alamat']; ?>"],
                    ["Email", "<?php echo $row['email_pengaju']; ?>"],
                    ["Tujuan", "<?php echo $row['balai_desa']; ?>"],
                    ["Pangan", "<?php echo $row['jenis_pangan']; ?>"],
                    ["Harga Satuan", "<?php echo $row['harga_satuan']; ?>"],
                    ["Total Harga", "Rp. <?php echo number_format($row['total_harga'], 0, '', ','); ?>"]
                ];

                // Menambahkan tabel ke dokumen
                doc.autoTable({
                    head: headers,
                    body: data,
                    startY: 25,
                    theme: 'grid',
                    styles: {
                        font: 'helvetica',
                        fontSize: 12,
                        cellPadding: 3,
                        overflow: 'linebreak'
                    },
                    headStyles: {
                        fillColor: [22, 160, 133],
                        textColor: [255, 255, 255],
                        fontSize: 14
                    },
                    columnStyles: {
                        0: {cellWidth: 50},
                        1: {cellWidth: 180}
                    }
                });

                // Memastikan dokumen telah dibuat sebelum disimpan
                if (doc) {
                    doc.save('Detail-Pengajuan.pdf');
                } else {
                    alert('Gagal membuat dokumen PDF. Silakan coba lagi.');
                }
            });
        </script>
    </div>
</body>

</html>