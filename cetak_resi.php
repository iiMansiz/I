<?php
include 'koneksi.php';
require_once 'dompdf/autoload.inc.php';
use Dompdf\Dompdf;
use Dompdf\Options;

if (isset($_GET['nomor_resi'])) {
  $nomor_resi = $_GET['nomor_resi'];

  $pesanan = $conn->query("SELECT p.nama_pembeli, pr.nama_produk, p.jumlah, p.alamat, j.nama_pengiriman, m.nama as metode, p.tanggal, p.nomor_resi
                          FROM pesanan p
                          JOIN produk pr ON p.produk_id = pr.id
                          JOIN jasa_pengiriman j ON p.jasa_pengiriman_id = j.id
                          JOIN metode_pembayaran m ON p.metode_pembayaran_id = m.id
                          WHERE p.nomor_resi = '$nomor_resi'");
  $tracking = $conn->query("SELECT status, tanggal FROM tracking WHERE nomor_resi = '$nomor_resi'");

  if ($pesanan->num_rows > 0) {
    $data = $pesanan->fetch_assoc();
    $html = '<h2>Resi Pengiriman</h2>';
    $html .= '<p><strong>Nomor Resi:</strong> ' . $data['nomor_resi'] . '</p>';
    $html .= '<p><strong>Nama Pembeli:</strong> ' . $data['nama_pembeli'] . '</p>';
    $html .= '<p><strong>Alamat Pembeli:</strong> ' . $data['alamat'] . '</p>';
    $html .= '<p><strong>Produk:</strong> ' . $data['nama_produk'] . '</p>';
    $html .= '<p><strong>Jumlah:</strong> ' . $data['jumlah'] . '</p>';
    $html .= '<p><strong>Jasa Pengiriman:</strong> ' . $data['nama_pengiriman'] . '</p>';
    $html .= '<p><strong>Metode Pembayaran:</strong> ' . $data['metode'] . '</p>';
    $html .= '<p><strong>Tanggal Pesanan:</strong> ' . $data['tanggal'] . '</p>';

    $html .= '<h3>Status Pengiriman</h3>';
    $html .= '<table border="1" cellpadding="5" cellspacing="0"><tr><th>Tanggal</th><th>Status</th></tr>';
    while ($row = $tracking->fetch_assoc()) {
      $html .= '<tr><td>' . $row['tanggal'] . '</td><td>' . $row['status'] . '</td></tr>';
    }
    $html .= '</table>';

    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isPhpEnabled', true);
    $dompdf = new Dompdf($options);
    $dompdf->loadHtml($html);
    $dompdf->render();
    $dompdf->stream('resi_' . $nomor_resi . '.pdf');
  } else {
    echo "Data pesanan tidak ditemukan";
  }
} else {
  echo "Nomor resi tidak diberikan";
}
?>
