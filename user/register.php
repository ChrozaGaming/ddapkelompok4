<?php
$host = "localhost";
$db   = "ddap4gizi";
$user = "root";
$pass = "";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $namalengkap = $_POST['namalengkap'];
    $no_hp = $_POST['no_hp'];
    $provinsi = $_POST['provinsi'];
    $kabupaten = $_POST['kabupaten'];
    $kecamatan = $_POST['kecamatan'];
    $kelurahan = $_POST['kelurahan'];
    $alamat = $_POST['alamat'];
    $email = $_POST['email'];
    $password = $_POST['password'];



    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "SELECT * FROM users WHERE email = '$email' OR no_hp = '$no_hp'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "Email or phone number already registered";
    } else {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (namalengkap, no_hp, provinsi, kabupaten, kecamatan, kelurahan, alamat, email, password)
                VALUES ('$namalengkap', '$no_hp', '$provinsi', '$kabupaten', '$kecamatan', '$kelurahan', '$alamat', '$email', '$hashed_password')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}


$conn->close();
?>


<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/user/register.css">
</head>
<body>
<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>" class="container mt-5">
    <div class="form-group">
        <label for="namalengkap">Nama Lengkap:</label>
        <input type="text" class="form-control" id="namalengkap" name="namalengkap">
    </div>
    <div class="form-group">
        <label for="no_hp">No HP:</label>
        <input type="text" class="form-control" id="no_hp" name="no_hp">
    </div>
    <div class="form-group">
        <label for="select2-provinsi">Provinsi</label>
        <select class="form-control select2-data-array" name="provinsi" id="select2-provinsi"></select>
    </div>
    <div class="form-group">
        <label for="select2-kabupaten">Kabupaten</label>
        <select class="form-control select2-data-array" name="kabupaten" id="select2-kabupaten"></select>
    </div>
    <div class="form-group">
        <label for="select2-kecamatan">Kecamatan</label>
        <select class="form-control select2-data-array" name="kecamatan" id="select2-kecamatan"></select>
    </div>
    <div class="form-group">
        <label for="select2-kelurahan">Kelurahan</label>
        <select class="form-control select2-data-array" name="kelurahan" id="select2-kelurahan"></select>
    </div>
    <div class="form-group">
        <label for="alamat">Alamat:</label>
        <input type="text" class="form-control" id="alamat" name="alamat">
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" class="form-control" id="email" name="email">
    </div>
    <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" name="password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
</body>
</html>
<script src="../assets/js/user/register.ts"></script>
<script src="../assets/apiwilayah/apiwilayah.ts"></script>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
