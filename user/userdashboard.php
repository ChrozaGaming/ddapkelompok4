<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header("Location: login");
    exit;
}



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

        #content {
            margin-left: 220px;
            padding: 20px;
            padding-top: 140px;
        }
    </style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand" href="#">User - Dashboard</a>
    <span class="navbar-text ml-auto">
    Selamat datang, <?php echo $namalengkap; ?>
    <a href="logout" class="ml-3">
        <i class="fas fa-door-open"></i> Keluar
    </a>
</span>
</nav>
<div id="sidebar">
    <ul class="nav flex-column">
        <li class="nav-item">
            <a class="nav-link" href="pendataan">Pendataan User</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="information">Information</a>
        </li>
    </ul>
</div>
<div id="content">
</div>
</body>

</html>

