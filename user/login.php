<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br>
        <input type="submit" value="Submit">
    </form>
</body>
</html>

<?php
include '../db/configdb.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if the user is in the users table
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // If the user is in the users table and the password is correct, redirect to userdashboard.php
            $_SESSION['email'] = $email;
            header('Location: userdashboard.php');
            exit;
        } else {
            echo "Invalid email or password";
        }
    } else {
        // Check if the user is in the userrequests table
        $sql = "SELECT * FROM userrequests WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                // If the user is in the userrequests table and the password is correct, redirect to waitinglist.php
                $_SESSION['email'] = $email;
                header('Location: waitinglist.php');
                exit;
            } else {
                echo "Invalid email or password";
            }
        } else {
            echo "Invalid email or password";
        }
    }
}

$conn->close();
?>