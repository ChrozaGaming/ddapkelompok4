<?php
session_start();
include '../db/configdb.php';

if (!isset($_SESSION['email'])) {
    header('Location: login.php');
    exit;
}

$email = $_SESSION['email'];

$sql = "SELECT * FROM pengajuanrequest WHERE email_balaidesa_tujuan = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
if ($stmt->execute()) {
    $result = $stmt->get_result();
} else {
    die("Error executing the query: " . $stmt->error);
}
// rest of your code
?>

<style>
    .demo {
        font-family: 'Noto Sans', sans-serif;
    }

    .panel {
        background: linear-gradient(to right, #095d6f, #1773c6);
        padding: 0;
        border-radius: 10px;
        border: none;
        box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.05), 0 0 0 10px rgba(0, 0, 0, 0.05);
    }

    .panel .panel-heading {
        padding: 20px 15px;
        border-radius: 10px 10px 0 0;
        margin: 0;
    }

    .panel .panel-heading .title {
        color: #fff;
        font-size: 28px;
        font-weight: 500;
        text-transform: capitalize;
        line-height: 40px;
        margin: 0;
    }

    .panel .panel-heading .btn {
        color: rgba(255, 255, 255, 0.5);
        background: transparent;
        font-size: 16px;
        text-transform: capitalize;
        border: 2px solid #fff;
        border-radius: 50px;
        transition: all 0.3s ease 0s;
    }

    .panel .panel-heading .btn:hover {
        color: #fff;
        text-shadow: 3px 3px rgba(255, 255, 255, 0.2);
    }

    .panel .panel-heading .form-control {
        color: #fff;
        background-color: transparent;
        width: 35%;
        height: 40px;
        border: 2px solid #fff;
        border-radius: 20px;
        display: inline-block;
        transition: all 0.3s ease 0s;
    }

    .panel .panel-heading .form-control:focus {
        background-color: rgba(255, 255, 255, 0.2);
        box-shadow: none;
        outline: none;
    }

    .panel .panel-heading .form-control::placeholder {
        color: rgba(255, 255, 255, 0.5);
        font-size: 15px;
        font-weight: 500;
    }

    .panel .panel-body {
        padding: 0;
    }

    .panel .panel-body .table thead tr th {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.2);
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;
        padding: 12px;
        border: none;
    }

    .panel .panel-body .table tbody tr td {
        color: #fff;
        font-size: 15px;
        padding: 10px 12px;
        vertical-align: middle;
        border: none;
    }

    .panel .panel-body .table tbody tr:nth-child(even) {
        background-color: rgba(255, 255, 255, 0.05);
    }

    .panel .panel-body .table tbody .action-list {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .panel .panel-body .table tbody .action-list li {
        display: inline-block;
        margin: 0 5px;
    }

    .panel .panel-body .table tbody .action-list li a {
        color: #fff;
        font-size: 15px;
        position: relative;
        z-index: 1;
        transition: all 0.3s ease 0s;
    }

    .panel .panel-body .table tbody .action-list li a:hover {
        text-shadow: 3px 3px 0 rgba(255, 255, 255, 0.3);
    }

    .panel .panel-body .table tbody .action-list li a:before,
    .panel .panel-body .table tbody .action-list li a:after {
        content: attr(data-tip);
        color: #fff;
        background-color: #111;
        font-size: 12px;
        padding: 5px 7px;
        border-radius: 4px;
        text-transform: capitalize;
        display: none;
        transform: translateX(-50%);
        position: absolute;
        left: 50%;
        top: -32px;
        transition: all 0.3s ease 0s;
    }

    .panel .panel-body .table tbody .action-list li a:after {
        content: '';
        height: 15px;
        width: 15px;
        padding: 0;
        border-radius: 0;
        transform: translateX(-50%) rotate(45deg);
        top: -18px;
        z-index: -1;
    }

    .panel .panel-body .table tbody .action-list li a:hover:before,
    .panel .panel-body .table tbody .action-list li a:hover:after {
        display: block;
    }

    .panel .panel-footer {
        color: #fff;
        background-color: transparent;
        padding: 15px;
        border: none;
    }

    .panel .panel-footer .col {
        line-height: 35px;
    }

    .pagination {
        margin: 0;
    }

    .pagination li a {
        color: #fff;
        background-color: transparent;
        border: 2px solid transparent;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        line-height: 31px;
        width: 35px;
        height: 35px;
        padding: 0;
        margin: 0 3px;
        border-radius: 50px;
        transition: all 0.3s ease 0s;
    }


    .pagination li a:hover {
        color: #fff;
        background-color: transparent;
        border-color: rgba(255, 255, 255, 0.2);
    }

    .pagination li a:focus,
    .pagination li.active a,
    .pagination li.active a:hover {
        color: #fff;
        background-color: transparent;
        border-color: #fff;
    }

    .pagination li:first-child a,
    .pagination li:last-child a {
        border-radius: 50%;
    }

    @media only screen and (max-width: 767px) {
        .panel .panel-heading .title {
            text-align: center;
            margin: 0 0 10px;
        }

        .panel .panel-heading .btn_group {
            text-align: center;
        }
    }
</style>


<!DOCTYPE html>
<html>
<head>
    <title>Notifikasi</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-offset-1 col-md-10">
            <div class="panel">
                <div class="panel-heading">
                    <div class="row">
                        <div class="landscape-content">
                            <div class="col col-sm-3 col-xs-12">
                                <h4 class="title">Notifikasi</h4>
                            </div>
                            <div class="col-sm-9 col-xs-12 text-right">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Desa Anda</th>
                            <th>Distributor</th>
                            <th>Nama Lengkap</th>
                            <th>No Handphone</th>
                            <th>Alamat</th>
                            <th>GPS</th>
                            <th>Email</th>
                            <th>Tujuan</th>
                            <th>Pangan</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php while ($row = $result->fetch_assoc()): ?>
                            <tr>
                                <td><?php echo $row['lurah_desa']; ?></td>
                                <td><?php echo $row['distributor']; ?></td>
                                <td class="nama-lengkap"><?php echo $row['nama_lengkap']; ?></td>
                                <td><?php echo $row['no_handphone']; ?></td>
                                <td><?php echo $row['alamat']; ?></td>
                                <td>
                                    <?php
                                    $gps_coordinates = $row['gps'];
                                    $google_maps_url = "https://www.google.com/maps/search/?api=1&query=" . urlencode($gps_coordinates);
                                    ?>
                                    <a href="javascript:void(0);"
                                       onclick="window.open('<?php echo $google_maps_url; ?>', '_blank')"
                                       style="color: white;">Buka
                                        di Google Maps</a>
                                </td>
                                <td><?php echo $row['email']; ?></td>
                                <td><?php echo $row['balai_desa']; ?></td>
                                <td>
                                    <?php
                                    $jenis_pangan_array = explode(", ", $row['jenis_pangan']);
                                    $berat_pangan_array = explode(", ", $row['berat_pangan']);
                                    $combined_array = array();
                                    for ($i = 0; $i < count($jenis_pangan_array); $i++) {
                                        $combined_array[] = ($i + 1) . '. ' . $jenis_pangan_array[$i] . ' ' . $berat_pangan_array[$i] . 'ton';
                                    }
                                    echo implode("<br>", $combined_array);
                                    ?>
                                </td>
                                <td>
                                    <ul class="action-list">
                                        <li><a href="#" data-tip="Setuju"><i class="fa fa-check"></i></a></li>
                                        <li><a href="#" data-tip="Tolak"><i class="fa fa-trash"></i></a></li>
                                    </ul>
                                </td>
                            </tr>
                        <?php endwhile; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>