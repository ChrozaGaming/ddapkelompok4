<?php
include '../db/configdb.php';

session_start();

if (!isset($_SESSION['email'])) {
    header('Location: login.php');
    exit;
}

$email = $_SESSION['email'];

$jenis_pangan = isset($_POST['jenis_pangan']) ? $_POST['jenis_pangan'] : [];
$i = 0;

if (is_array($jenis_pangan) && array_key_exists($i, $jenis_pangan)) {
    $element = $jenis_pangan[$i];
} else {
    $element = null;
}

$sql = "SELECT gps FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$user_gps = explode(",", $user['gps']);

$sql = "SELECT id, lurah_desa, jenis_pangan, berat_pangan, berat, distributor, gps,
        ( 6371 * acos( cos( radians(?) ) * cos( radians( SUBSTRING_INDEX(gps, ',', 1) ) ) * cos( radians( SUBSTRING_INDEX(gps, ',', -1) ) - radians(?) ) + sin( radians(?) ) * sin(radians( SUBSTRING_INDEX(gps, ',', 1) )) ) ) AS distance
        FROM pendataan
        WHERE email != ?
        ORDER BY distance";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ddds", $user_gps[0], $user_gps[1], $user_gps[0], $email);
$stmt->execute();

$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Data Pendataan</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        $(document).ready(function () {
            $('.permintaan-btn').click(function () {
                var collapseElementId = $(this).attr('data-target');
                var collapseElement = $(collapseElementId);
                var button = $(this);

                button.prop('disabled', true);

                if ($(collapseElement).hasClass('show')) {
                    button.text('Tampilkan Data');
                } else {
                    button.text('Sembunyikan Data');
                }

                setTimeout(function () {
                    $(collapseElement).collapse('toggle');
                }, 350);

                setTimeout(function () {
                    button.prop('disabled', false);
                }, 700);
            });
        });
    </script>
</head>
<body>
<div class="container">
    <h2 class="my-3">Data Pendataan</h2>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>ID</th>
            <th>Lurah Desa</th>
            <th>Distributor</th>
            <th>Koordinat</th>
            <th>Jarak (km)</th>
            <th class="text-center">Actions</th>
        </tr>
        </thead>
        <tbody>
        <?php
        $counter = 1;
        while ($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?php echo $counter; ?></td>
                <td><?php echo $row["lurah_desa"]; ?></td>
                <td><?php echo $row["distributor"]; ?></td>
                <td><?php echo $row["gps"]; ?></td>
                <td><?php echo floor($row["distance"]) . ' km'; ?></td>
                <td class="text-center">
                    <div style="display: flex; gap: 1mm;">
                        <button class="btn btn-primary permintaan-btn" type="button" data-toggle="collapse"
                                data-target="#collapse<?php echo $counter; ?>" aria-expanded="false"
                                aria-controls="collapse<?php echo $counter; ?>" onclick="changeButtonText(this)">
                            Tampilkan Data
                        </button>
                        <a href="pengajuan.php?id=<?php echo $row['id']; ?>&lurah_desa=<?php echo urlencode($row['lurah_desa']); ?>&distributor=<?php echo urlencode($row['distributor']); ?>&jenis_pangan=<?php echo urlencode($row['jenis_pangan']); ?>&berat_pangan=<?php echo urlencode($row['berat_pangan']); ?>"
                           class="btn btn-success d-flex align-items-center" target="_blank">
                            Pengajuan
                        </a>
                    </div>
                </td>
            </tr>
            <?php
            $jenis_pangan = explode(',', $row["jenis_pangan"]);
            $berat_pangan = explode(',', $row["berat_pangan"]);
            $jenis_pangan_counter = 1;
            for ($i = 0; $i < count($jenis_pangan); $i++): ?>
                <tr class="collapse" id="collapse<?php echo $counter; ?>">
                    <td colspan="6">
                        <?php
                        echo '<style>';
                        echo '.inner-table {';
                        echo '  border: 1px solid black;';
                        echo '  border-collapse: collapse;';
                        echo '  border-radius: 10px;';
                        echo '  overflow: hidden;';
                        echo '}';
                        echo '.inner-table th, .inner-table td {';
                        echo '  border: 1px solid black;';
                        echo '  padding: 10px;';
                        echo '}';
                        echo '</style>';

                        echo '<table class="inner-table">';
                        echo '<tr><th>ID</th><th>Jenis Pangan</th><th>Berat Pangan</th></tr>';
                        for ($i = 0; $i < count($jenis_pangan); $i++):
                            echo '<tr>';
                            echo '<td>' . $jenis_pangan_counter . '</td>';
                            echo '<td>' . $jenis_pangan[$i] . '</td>';
                            echo '<td>' . $berat_pangan[$i] . 'ton' . '</td>';
                            echo '</tr>';
                            $jenis_pangan_counter++;
                        endfor;
                        echo '</table>';
                        ?>
                    </td>
                </tr>
                <?php
                $jenis_pangan_counter++;
            endfor; ?>
            <style>
                tr:nth-child(even) {
                    background-color: #f2f2f2 !important;
                }

                tr:nth-child(odd) {
                    background-color: #ffffff !important;
                }
            </style>
            <?php
            $counter++;
        endwhile; ?>
        </tbody>
    </table>
</div>
</body>
</html>

<script>
    $(document).ready(function () {
        var id = $('#lurah_desa').val();

        $.ajax({
            url: 'fetch_data.php',
            method: 'POST',
            data: {id: id},
            dataType: 'json',
            success: function (data) {
                $('#distributor').empty();
                $('#jenis_pangan[]').empty();

                $.each(data, function (key, value) {
                    $('#distributor').append('<option value="' + value.distributor + '">' + value.distributor + '</option>');
                    $('#jenis_pangan[]').append('<option value="' + value.jenis_pangan + '">' + value.jenis_pangan + '</option>');
                    $('#berat_pangan[]').val(value.berat_pangan);
                });
            }
        });
    });
</script>

<?php
$stmt->close();
$conn->close();
?>