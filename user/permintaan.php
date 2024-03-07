<?php
include '../db/configdb.php'; // Include your database configuration file

if(session_status() == PHP_SESSION_NONE){
    // session has not started
    session_start();
}

if (!isset($_SESSION['email'])) {
    // Redirect to login page or show an error
    header('Location: login.php');
    exit;
}

$email = $_SESSION['email'];

// Fetch the GPS coordinates of the logged-in user
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
    <!-- Include Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
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
        $counter = 1; // Initialize counter
        while ($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?php echo $counter++; ?></td> <!-- Display counter and increment it -->
                <td><?php echo $row["lurah_desa"]; ?></td>
                <td><?php echo $row["distributor"]; ?></td>
                <td><?php echo $row["gps"]; ?></td>
                <td><?php echo floor($row["distance"]) . ' km'; ?></td>
                <td class="text-center">
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse<?php echo $counter; ?>" aria-expanded="false" aria-controls="collapse<?php echo $counter; ?>">Tampilkan Data</button>
                    <button class="btn btn-success" style="margin-top: 1mm;">Green Button</button>
                </td>
            </tr>
            <?php
            $jenis_pangan = explode(',', $row["jenis_pangan"]);
            $berat_pangan = explode(',', $row["berat_pangan"]);
            $jenis_pangan_counter = 1; // Initialize jenis_pangan counter
            for ($i = 0; $i < count($jenis_pangan); $i++): ?>
                <tr class="collapse" id="collapse<?php echo $counter; ?>">
                    <td colspan="6">
                        <?php
                        echo '<strong>' . $jenis_pangan_counter . '.</strong> '; // Echo the jenis_pangan counter before each item, wrapped in <strong> tags
                        echo str_pad($jenis_pangan[$i], 20); // Pad the jenis_pangan to align them
                        echo ' ' . $berat_pangan[$i] . 'kg';
                        ?>
                    </td>
                </tr>
                <?php
                $jenis_pangan_counter++; // Increment the jenis_pangan counter inside the loop
            endfor; ?>
            <style>
                tr:nth-child(even) {background-color: #f2f2f2 !important;} /* Gray for even rows */
                tr:nth-child(odd) {background-color: #ffffff !important;} /* White for odd rows */
            </style>
        <?php endwhile; ?>
        </tbody>
    </table>
</div>
</body>
</html>

<?php
$stmt->close();
$conn->close();
?>
