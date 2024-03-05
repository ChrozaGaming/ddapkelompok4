<?php
include '../db/configdb.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $license_key = $_POST['license_key'];

    $sql = "SELECT * FROM userrequests WHERE license_key = '$license_key'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        header('Location: userdashboard');
    } else {
        echo "Invalid license key";
    }
}
?><?php
