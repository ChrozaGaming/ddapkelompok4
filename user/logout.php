<?php
session_start();

// Hapus semua variabel sesi
$_SESSION = array();

// Jika ingin mengakhiri sesi, hapus juga cookie sesi.
// Note: Ini akan merusak sesi, dan bukan hanya data sesi!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finally, hapus segala sesi
session_destroy();

// Mengarahkan ke halaman login
header("Location: login");
exit;
