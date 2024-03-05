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
            header('Location: userdashboard');
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
                header('Location: waitinglist');
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

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <!-- Include Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <!-- Custom CSS -->
    <style>
        body {
            background: linear-gradient(to right, #0062E6, #33AEFF);
            height: 100vh;
        }
        .card {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
        }
        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        .container {
            height: 100vh;
            justify-content: center;
            align-items: center;
        }
        .card-header {
            background-color: #0062E6;
            color: white;
        }
        .btn-primary {
            background-color: #0062E6;
            border-color: #0062E6;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Login</div>
                <div class="card-body">
                    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" class="form-control" required>
                        </div>
                        <input type="submit" value="Submit" class="btn btn-primary">
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
