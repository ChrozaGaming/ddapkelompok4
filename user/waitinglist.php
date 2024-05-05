<?php
include '../db/configdb.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $license_key = $_POST['license_key'];

    $sql = "SELECT * FROM qrcodes WHERE license_key = '$license_key'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $qrcode = $result->fetch_assoc();
        $email = $qrcode['email'];

        $sql = "SELECT * FROM userrequests WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

            $sql = "INSERT INTO users (namalengkap, no_hp, provinsi, kabupaten, kecamatan, kelurahan, alamat, email, status, password)
                    VALUES ('{$user['namalengkap']}', '{$user['no_hp']}', '{$user['provinsi']}', '{$user['kabupaten']}', '{$user['kecamatan']}', '{$user['kelurahan']}', '{$user['alamat']}', '{$user['email']}', 'aktif', '{$user['password']}')";

            if ($conn->query($sql) === TRUE) {
                // Delete the user data from the userrequests table
                $sql = "DELETE FROM userrequests WHERE email = '$email'";
                if ($conn->query($sql) === TRUE) {
                    header('Location: login.php');
                    exit;
                } else {
                    echo "Error deleting record: " . $conn->error;
                }
            } else {
                echo "Error inserting record: " . $conn->error;
            }
        } else {
            echo "No user found with this email";
        }
    } else {
        echo "Invalid license key";
    }
}

$conn->close();
?>

<style>
    #preview {
        position: absolute;
        top: 20%;
        left: 38%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 400px;
        height: auto;
    }
</style>

<video id="preview"></video>

<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script type="text/javascript" src="https://cdn.rawgit.com/schmich/instascan-builds/master/instascan.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>

<body>
    <div class="container mt-5">
        <h1 class="text-center font-weight-bold">Waiting List</h1>
        <video id="preview" style="width: 100%; max-width: 400px; height: auto;"></video>
        <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
            <div class="form-group">
                <label for="license_key">License Key:</label>
                <input type="text" class="form-control" id="license_key" name="license_key" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>

    <script>
        let scanner = new Instascan.Scanner({
            video: document.getElementById('preview')
        });
        scanner.addListener('scan', function(content) {
            document.getElementById('license_key').value = content;
        });
        Instascan.Camera.getCameras().then(function(cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]).catch(function(e) {
                    console.error('Error starting camera', e);
                });
            } else {
                console.error('No cameras found.');
            }
        }).catch(function(e) {
            console.error('Error getting cameras', e);
        });
    </script>


</body>

</html>