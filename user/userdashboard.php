<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header("Location: login");
    exit;
}

$email = $_SESSION['email'];
$sql = "SELECT * FROM pengajuanrequest WHERE email_tujuan = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
if ($stmt->execute()) {
    $result = $stmt->get_result();
} else {
    die("Error executing the query: " . $stmt->error);
}

$num_notifications = mysqli_num_rows($result);

$email = $_SESSION['email'];
$sql = "SELECT namalengkap, gps FROM users WHERE email = '$email'";
$result = $conn->query($sql);
$user = $result->fetch_assoc();
$namalengkap = $user['namalengkap'];

// Check if the user's location has been set
if (empty($user['gps'])) {
    // Redirect the user to the location input page
    header("Location: location_input.php");
    exit;
}

$conn->close();
?>

<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
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
        <a class="navbar-brand" href="#">User - Dashboard</a>
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
                <a class="nav-link" href="hasilpengajuan.php">Hasil Pengajuan</a>
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