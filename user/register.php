<?php
include '../db/configdb.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $namalengkap = $_POST['namalengkap'];
    $no_hp = $_POST['no_hp'];
    $provinsi = isset($_POST['provinsi']) ? $_POST['provinsi'] : '';
    $kabupaten = isset($_POST['kabupaten']) ? $_POST['kabupaten'] : '';
    $kecamatan = isset($_POST['kecamatan']) ? $_POST['kecamatan'] : '';
    $kelurahan = isset($_POST['kelurahan']) ? $_POST['kelurahan'] : '';
    $alamat = $_POST['alamat'];
    $email = $_POST['email'];
    $password = $_POST['password'];


    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO userrequests (namalengkap, no_hp, provinsi, kabupaten, kecamatan, kelurahan, alamat, email, password)
        VALUES ('$namalengkap', '$no_hp', '$provinsi', '$kabupaten', '$kecamatan', '$kelurahan', '$alamat', '$email', '$hashed_password')";

    if ($conn->query($sql) === TRUE) {
        header('Location: waitinglist.php');
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>


<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/user/register.css">
</head>
<body>
<div class="container mt-5">
    <h1 class="text-center font-weight-bold">Form Pendaftaran - User</h1>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <!-- Rest of your form... -->
    </form>
</div>
<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" class="container mt-5">
    <div class="form-group">
        <label for="namalengkap">Nama Lengkap:</label>
        <input type="text" class="form-control" id="namalengkap" name="namalengkap">
    </div>
    <div class="form-group">
        <label for="no_hp">No HP:</label>
        <input type="text" class="form-control" id="no_hp" name="no_hp" pattern="^[0-9]*$" title="Hanya angka yang diperbolehkan dan tidak boleh ada spasi atau simbol lainnya">
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
        <input type="email" class="form-control" id="email" name="email" pattern=".+@.+" required>
        <div class="invalid-feedback">Harap berikan alamat email yang valid.</div>
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

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<script>
    var urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
    var urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
    var urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
    var urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

    function clearOptions(id) {
        console.log("on clearOptions :" + id);

        //$('#' + id).val(null);
        $('#' + id).empty().trigger('change');
    }

    console.log('Load Provinsi...');
    $.getJSON(urlProvinsi, function (res) {

        res = $.map(res, function (obj) {
            obj.text = obj.nama
            return obj;
        });

        data = [{
            id: "",
            nama: "- Pilih Provinsi -",
            text: "- Pilih Provinsi -"
        }].concat(res);

        //implemen data ke select provinsi
        $("#select2-provinsi").select2({
            dropdownAutoWidth: true,
            width: '100%',
            data: data
        })
    });

    var selectProv = $('#select2-provinsi');
    $(selectProv).change(function () {
        var value = $(selectProv).val();
        clearOptions('select2-kabupaten');

        if (value) {
            console.log("on change selectProv");

            var text = $('#select2-provinsi :selected').text();
            console.log("value = " + value + " / " + "text = " + text);

            console.log('Load Kabupaten di ' + text + '...')
            $.getJSON(urlKabupaten + value + ".json", function (res) {

                res = $.map(res, function (obj) {
                    obj.text = obj.nama
                    return obj;
                });

                data = [{
                    id: "",
                    nama: "- Pilih Kabupaten -",
                    text: "- Pilih Kabupaten -"
                }].concat(res);

                //implemen data ke select provinsi
                $("#select2-kabupaten").select2({
                    dropdownAutoWidth: true,
                    width: '100%',
                    data: data
                })
            })
        }
    });

    var selectKab = $('#select2-kabupaten');
    $(selectKab).change(function () {
        var value = $(selectKab).val();
        clearOptions('select2-kecamatan');

        if (value) {
            console.log("on change selectKab");

            var text = $('#select2-kabupaten :selected').text();
            console.log("value = " + value + " / " + "text = " + text);

            console.log('Load Kecamatan di ' + text + '...')
            $.getJSON(urlKecamatan + value + ".json", function (res) {

                res = $.map(res, function (obj) {
                    obj.text = obj.nama
                    return obj;
                });

                data = [{
                    id: "",
                    nama: "- Pilih Kecamatan -",
                    text: "- Pilih Kecamatan -"
                }].concat(res);

                //implemen data ke select provinsi
                $("#select2-kecamatan").select2({
                    dropdownAutoWidth: true,
                    width: '100%',
                    data: data
                })
            })
        }
    });

    var selectKec = $('#select2-kecamatan');
    $(selectKec).change(function () {
        var value = $(selectKec).val();
        clearOptions('select2-kelurahan');

        if (value) {
            console.log("on change selectKec");

            var text = $('#select2-kecamatan :selected').text();
            console.log("value = " + value + " / " + "text = " + text);

            console.log('Load Kelurahan di ' + text + '...')
            $.getJSON(urlKelurahan + value + ".json", function (res) {

                res = $.map(res, function (obj) {
                    obj.text = obj.nama
                    return obj;
                });

                data = [{
                    id: "",
                    nama: "- Pilih Kelurahan -",
                    text: "- Pilih Kelurahan -"
                }].concat(res);

                //implemen data ke select provinsi
                $("#select2-kelurahan").select2({
                    dropdownAutoWidth: true,
                    width: '100%',
                    data: data
                })
            })
        }
    });

    var selectKel = $('#select2-kelurahan');
    $(selectKel).change(function () {
        var value = $(selectKel).val();

        if (value) {
            console.log("on change selectKel");

            var text = $('#select2-kelurahan :selected').text();
            console.log("value = " + value + " / " + "text = " + text);
        }
    });
</script>


