<?php
include '../db/configdb.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email'])) {
        $email = $_POST['email'];
        $action = $_POST['action'];

        if ($action == 'accept') {
            // Redirect to the confirmation page
            header("Location: confirm_licensekey.php?email=" . urlencode($email));
            exit;
        } else if ($action == 'reject') {
            // Delete the user's record
            $sql = "DELETE FROM userrequests WHERE email = '$email'";
            $conn->query($sql);
        }
    }
}

$sql = "SELECT * FROM userrequests";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<div class="container mt-5">
    <table class="table table-bordered">
        <thead>
        <tr>
            <th>Nama Lengkap</th>
            <th>No HP</th>
            <th>Alamat</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <?php
        while($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row["namalengkap"] . "</td>";
            echo "<td>" . $row["no_hp"] . "</td>";
            echo "<td>" . $row["alamat"] . "</td>";
            echo "<td>" . $row["email"] . "</td>";
            echo "<td>";
            echo "<form method='post' action='userrequest.php'>";
            echo "<input type='hidden' name='email' value='" . $row["email"] . "'>";
            echo "<button type='submit' name='action' value='accept' class='btn btn-success'><i class='fa fa-check'></i></button>";
            echo "<button type='submit' name='action' value='reject' class='btn btn-danger ml-2'><i class='fa fa-times'></i></button>";
            echo "</form>";
            echo "</td>";
            echo "</tr>";
        }
        ?>
        </tbody>
    </table>
</div>
</body>
</html>