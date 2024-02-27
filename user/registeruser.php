<?php
$provinsiJson = file_get_contents('http://localhost:3000/api/provinsi');
$provinsi = json_decode($provinsiJson, true);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register User</title>
</head>
<body>
<form action="submit_register.php" method="post">
    <label for="provinsi">Provinsi:</label>
    <select id="provinsi" name="provinsi">
        <?php foreach ($provinsi as $prov) : ?>
            <option value="<?= $prov['province_id'] ?>"><?= $prov['province'] ?></option>
        <?php endforeach; ?>
    </select>

    <label for="kabupaten">Kabupaten:</label>
    <select id="kabupaten" name="kabupaten">
        <!-- Isi dengan data kabupaten setelah user memilih provinsi -->
    </select>

    <label for="kecamatan">Kecamatan:</label>
    <select id="kecamatan" name="kecamatan">
        <!-- Isi dengan data kecamatan setelah user memilih kabupaten -->
    </select>

    <label for="kelurahan">Kelurahan:</label>
    <select id="kelurahan" name="kelurahan">
        <!-- Isi dengan data kelurahan setelah user memilih kecamatan -->
    </select>

    <input type="submit" value="Register">
</form>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    // Anda perlu menambahkan kode JavaScript untuk mengambil data kabupaten, kecamatan, dan kelurahan
    // setelah user memilih provinsi, kabupaten, dan kecamatan.
</script>
</body>
</html>