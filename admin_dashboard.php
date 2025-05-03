<?php
// admin_dashboard.php
session_start();
if (!isset($_SESSION['admin'])) {
    header('Location: login_admin.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Selamat datang, Admin</h2>
        <p><a href="admin_pesanan.php" class="btn btn-primary">Lihat Pesanan</a></p>
        <p><a href="logout.php" class="btn btn-danger">Logout</a></p>
    </div>
</body>
</html>
