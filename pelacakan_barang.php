<?php
include 'koneksi.php';

if (isset($_POST['nomor_resi'])) {
  $nomor_resi = $_POST['nomor_resi'];

  $result = $conn->query("SELECT * FROM tracking WHERE nomor_resi = '$nomor_resi'");
  if ($result->num_rows > 0) {
    $tracking = $result->fetch_all(MYSQLI_ASSOC);
  } else {
    $tracking = [];
    $message = "Nomor resi tidak ditemukan.";
  }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Pelacakan Pengiriman</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
  <h2>Pelacakan Pengiriman</h2>
  <form method="post">
    <div class="mb-3">
      <label for="nomor_resi" class="form-label">Masukkan Nomor Resi</label>
      <input type="text" name="nomor_resi" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-primary">Lacak</button>
  </form>
  <hr>
  <?php if (!empty($message)) echo "<div class='alert alert-warning'>$message</div>"; ?>
  <?php if (!empty($tracking)) { ?>
    <h3>Status Pengiriman</h3>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($tracking as $row) { ?>
          <tr>
            <td><?php echo $row['tanggal']; ?></td>
            <td><?php echo $row['status']; ?></td>
          </tr>
        <?php } ?>
      </tbody>
    </table>
  <?php } ?>
</div>
</body>
</html>
