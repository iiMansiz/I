<?php
include 'koneksi.php';

$nama = $_POST['nama'];
$jumlah = $_POST['jumlah'];
$produk = $_POST['produk'];
$jasa_pengiriman = $_POST['jasa_pengiriman'];
$metode_pembayaran = $_POST['metode_pembayaran'];

// Generate nomor resi otomatis
$kode_jasa = $conn->query("SELECT nama_pengiriman FROM jasa_pengiriman WHERE id = $jasa_pengiriman")->fetch_assoc()['nama_pengiriman'];
$nomor_resi = strtoupper(substr($kode_jasa, 0, 3)) . '-' . date('Ymd') . '-' . rand(1000, 9999);

$stmt = $conn->prepare("INSERT INTO pesanan (nama_pembeli, jumlah, produk_id, jasa_pengiriman_id, metode_pembayaran_id, nomor_resi, tanggal) VALUES (?, ?, ?, ?, ?, ?, NOW())");
$stmt->bind_param("siiii", $nama, $jumlah, $produk, $jasa_pengiriman, $metode_pembayaran, $nomor_resi);
$stmt->execute();

if ($stmt->affected_rows > 0) {
  echo "<h2>Pesanan berhasil disimpan! Nomor Resi: $nomor_resi</h2><a href='checkout.html'>Kembali</a>";
} else {
  echo "Gagal menyimpan pesanan.";
}

$stmt->close();
$conn->close();
