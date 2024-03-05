<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>
<body>
<div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="text-center">
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            $email = $_GET['email'];
            echo "<p>Apakah Anda yakin ingin melanjutkan ke tahap proses pembuatan license key untuk email " . $email . "?</p>";
            echo "<div class='d-flex justify-content-center'>";
            echo "<form method='post' action='generateqrcode' class='mr-2'>";
            echo "<input type='hidden' name='email' value='" . $email . "'>";
            echo "<input type='submit' name='action' value='Setuju' class='btn btn-primary'>";
            echo "</form>";
            echo "<form method='post' action='userrequest'>";
            echo "<input type='submit' name='action' value='Tidak Setuju' class='btn btn-danger'>";
            echo "</form>";
            echo "</div>";
        }
        ?>
    </div>
</div>
</body>
</html>