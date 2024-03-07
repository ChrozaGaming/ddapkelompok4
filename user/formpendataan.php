<?php
// Start the session
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $jenis_pangan = implode(", ", $_POST['jenis_pangan']);
    $berat_pangan = implode(", ", $_POST['berat_pangan']);
    $berat = $_POST['berat'];
    $distributor = $_POST['distributor'];
    $gps = $_POST['gps'];
    $lurah_desa = $_POST['lurah_desa']; // Get the 'lurah_desa' data from the form data
    $email = $_SESSION['email']; // Get the 'email' data from the session

    // Include your database configuration file
    include '../db/configdb.php';

    // Check if the email already exists in the table
    $sql = "SELECT * FROM pendataan WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // If the email already exists, delete the existing row
    if ($result->num_rows > 0) {
        $sql = "DELETE FROM pendataan WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
    }

    // Prepare an SQL statement to insert the new data into the database
    $sql = "INSERT INTO pendataan (jenis_pangan, berat_pangan, berat, distributor, gps, lurah_desa, email) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind the parameters and execute the SQL statement
    $stmt->bind_param("sssssss", $jenis_pangan, $berat_pangan, $berat, $distributor, $gps, $lurah_desa, $email);

    // Execute the SQL statement
    if ($stmt->execute()) {
        // The data was inserted successfully
        echo "Data was inserted successfully.";
    } else {
        // There was an error inserting the data
        echo "Error: " . $stmt->error;
    }

    // Close the statement and the database connection
    $stmt->close();
    $conn->close();
}
?>