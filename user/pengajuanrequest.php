<?php
include '../db/configdb.php';

if ($conn === null) {
    die("Connection failed: Unable to connect to the database");
}

$sql = "SELECT lurah_desa FROM pengajuanrequest";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $lurah_desa = $row['lurah_desa'];

        $sql = "SELECT * FROM balai_desa WHERE lurah_desa = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $lurah_desa);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo "Lurah Desa " . $lurah_desa . " exists in the balai_desa table.<br>";
        } else {
            echo "Lurah Desa " . $lurah_desa . " does not exist in the balai_desa table.<br>";
        }
    }
} else {
    echo "No data found in the pengajuanrequests table.";
}

$conn->close();
?>