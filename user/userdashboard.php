<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header("Location: login");
    exit;
}

$email = $_SESSION['email'];

// Query untuk mendapatkan nama lengkap dari tabel users
$sqlUser = "SELECT namalengkap FROM users WHERE email = ?";
$stmtUser = $conn->prepare($sqlUser);
$stmtUser->bind_param("s", $email);
$stmtUser->execute();
$resultUser = $stmtUser->get_result();
$user = $resultUser->fetch_assoc();

if ($user) {
    $namalengkap = $user['namalengkap'];
} else {
    $namalengkap = "Nama Tidak Ditemukan"; // Atau penanganan lain sesuai kebutuhan
}

// Query untuk mendapatkan data persetujuan berdasarkan email_pengaju
$sqlApproval = "SELECT * FROM persetujuan WHERE email_desa = ?";
$stmtApproval = $conn->prepare($sqlApproval);
$stmtApproval->bind_param("s", $email);
$stmtApproval->execute();
$resultApproval = $stmtApproval->get_result();

// Query untuk mendapatkan jumlah notifikasi dari tabel pengajuanrequest
$sqlNotifications = "SELECT COUNT(*) AS num_notifications FROM pengajuanrequest WHERE email_tujuan = ?";
$stmtNotifications = $conn->prepare($sqlNotifications);
$stmtNotifications->bind_param("s", $email);
$stmtNotifications->execute();
$resultNotifications = $stmtNotifications->get_result();
$rowNotifications = $resultNotifications->fetch_assoc();

$num_notifications = $rowNotifications ? $rowNotifications['num_notifications'] : 0;

// Query untuk mendapatkan data pendataan berdasarkan email
$sql = "SELECT * FROM pendataan WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "<div id='content'>";
    echo "<h2>Data Pendataan di Desa Anda!</h2>";
    echo "<table class='table table-bordered'>";
    echo "<thead><tr><th>ID</th><th>Lurah Desa</th><th>Jenis Pangan</th><th>Distributor</th><th>GPS</th><th>Email Desa Anda</th><th>Total Harga</th></tr></thead>";
    echo "<tbody>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . htmlspecialchars($row['lurah_desa']) . "</td>";
        echo "<td>";
        $jenis_pangan = explode(',', $row['jenis_pangan']);
        $berat_pangan = explode(',', $row['berat_pangan']);
        $harga_satuan = explode(',', $row['harga_satuan']);
        foreach ($jenis_pangan as $index => $jenis) {
            echo htmlspecialchars($jenis) . " " . htmlspecialchars($berat_pangan[$index]) . " TON - Rp " . number_format($harga_satuan[$index], 0, '', ',') . "<br>";
        }
        echo "</td>";
        echo "<td>" . htmlspecialchars($row['distributor']) . "</td>";
        echo "<td><a href='https://www.google.com/maps/search/?api=1&query=" . urlencode($row['gps']) . "' target='_blank'>Buka di Google Maps</a></td>";
        echo "<td>" . htmlspecialchars($row['email']) . "</td>";
        echo "<td>" . number_format((float)$row['total_harga'], 0, '', ',') . "</td>";
        echo "</tr>";
    }
    echo "</tbody>";
    echo "</table>";
    echo "</div>";
} else {
    echo "<div id='content'><h2>Belum ada data di desa anda!</h2></div>";
}

if ($resultApproval->num_rows > 0) {
    echo "<div id='content'>";
    echo "<h2>Data Persetujuan Pengiriman</h2>";
    echo "<table class='table table-bordered'>";
    echo "<thead><tr><th>ID</th><th>Lurah Desa</th><th>Jenis Pangan</th><th>Distributor</th><th>GPS</th><th>Email Pengaju</th><th>Total Harga</th><th>Actions</th></tr></thead>";
    echo "<tbody>";
    while ($rowApproval = $resultApproval->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $rowApproval['id'] . "</td>";
        echo "<td>" . htmlspecialchars($rowApproval['balai_desa']) . "</td>";
        echo "<td>";
        $jenis_pangan = explode(',', $rowApproval['jenis_pangan']);
        $berat_pangan = explode(',', $rowApproval['berat_pangan']);
        $harga_satuan = explode(',', $rowApproval['harga_satuan']);
        foreach ($jenis_pangan as $index => $jenis) {
            echo htmlspecialchars($jenis) . " " . htmlspecialchars($berat_pangan[$index]) . " TON - Rp " . number_format($harga_satuan[$index], 0, '', ',') . "<br>";
        }
        echo "</td>";
        // echo "<td>" . htmlspecialchars($rowApproval['berat_pangan']) . "</td>";
        echo "<td>" . htmlspecialchars($rowApproval['distributor']) . "</td>";
        echo "<td><a href='https://www.google.com/maps/search/?api=1&query=" . urlencode(htmlspecialchars($rowApproval['balai_desa'])) . "' target='_blank'>Buka di Google Maps</a></td>";
        echo "<td>" . htmlspecialchars($rowApproval['email_pengaju']) . "</td>";
        echo "<td>" . number_format($rowApproval['total_harga'], 2) . "</td>";
        echo "<td><a href='print_action.php?id=" . $rowApproval['id'] . "'><i class='fas fa-print'></i></a> <a href='checklist_action.php?id=" . $rowApproval['id'] . "' style='color: green;'><i class='fas fa-check'></i></a></td>";
        echo "</tr>";
    }
    echo "</tbody></table>";
    echo "</div>";
} else {
    echo "<div id='content'><h2>Belum ada data persetujuan.</h2></div>"; // Menampilkan pesan jika tidak ada data persetujuan
}




$conn->close();
?>

<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css">
    <style>
        #sidebar {
            width: 200px;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #f8f9fa;
            padding: 20px;
            padding-top: 60px;
        }

        #notificationTooltip {
            position: relative;
            /* other styles... */
        }

        #content {
            margin-left: 220px;
            padding: 20px;
            padding-top: 140px;
        }

        .navbar-text {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
        }

        .modal-dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .notification-group {
            display: flex;
            align-items: center;
            position: relative;
        }

        .bell-icon {
            font-size: 1.5rem;
        }

        .notification-bubble {
            position: absolute;
            top: -10px;
            right: -10px;
            background-color: red;
            color: white;
            border-radius: 50%;
            padding: 5px 10px;
            font-size: 0.45rem;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a class="navbar-brand" href="#">
            <img src="../assets/img/logo/ThriveTerra_Logo.png" alt="Logo Thrive Terra" style="height: 50px; width: 120px; margin-right: px;"> User - Dashboard
        </a>
        <div class="navbar-text ml-auto d-flex align-items-center">
            <div style="flex-grow: 1; text-align: right;">Selamat datang, <?php echo $namalengkap; ?> &nbsp;</div>
            <div id="notification-icon" class="notification-group">
                <i class="fas fa-bell bell-icon"></i>
                <span class="notification-bubble"><?php echo $num_notifications; ?></span>
            </div>
            <a href="logout" class="ml-3">
                <i class="fas fa-door-open"></i> Keluar
            </a>
        </div>
    </nav>

    <div id="notificationTooltip" style="display: none;">
        <button id="closeTooltip" style="float: right;">
            <i class="fas fa-times"></i>
        </button> <!-- Content of notifikasi.php will be loaded here -->
    </div>

    <div id="sidebar">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link" href="pendataan">Pendataan User</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="hasilpengajuan">Hasil Pengajuan</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="riwayatpersetujuan">Riwayat Persetujuan</a>
            </li>
        </ul>
    </div>
    <div id="content">
    </div>

    <!-- Bootstrap modal -->
    <div class="modal fade" id="notificationModal" tabindex="-1" role="dialog" aria-labelledby="notificationModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="notificationModalLabel">Notifications</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Content of notifikasi.php will be loaded here -->
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script>
        $(document).ready(function() {
            // Fungsi untuk memperbarui jumlah notifikasi
            function updateNotificationCount() {
                $.get('get_notification_count.php', function(data) {
                    $('.notification-bubble').text(data);
                });
            }

            // Panggil fungsi ini setiap 500 milidetik
            setInterval(updateNotificationCount, 500);

            $('#notification-icon').click(function() {
                $.get('notifikasi.php', function(data) {
                    $('#notificationTooltip').html(data);
                    $('#notificationTooltip').show();
                    $('#notificationTooltip').tooltip();
                });
            });

            // Attach the click event handler to the close button using the on() method
            $(document).on('click', '#closeTooltip', function() {
                $('#notificationTooltip').hide();
            });

            // Hide the tooltip when anywhere else on the page is clicked
            $(document).click(function(event) {
                if (!$(event.target).closest('#notification-icon').length && !$(event.target).is('#closeTooltip')) {
                    $('#notificationTooltip').hide();
                }
            });
        });
    </script>

</body>

</html>