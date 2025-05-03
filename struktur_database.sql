-- Buat database
CREATE DATABASE IF NOT EXISTS panel_penjualan;
USE panel_penjualan;

-- Tabel admin
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Tambah user admin default
INSERT INTO admin (username, password)
VALUES ('admin', SHA2('admin123', 256));

-- Tabel pembeli
CREATE TABLE IF NOT EXISTS pembeli (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL
);

-- Tabel produk
CREATE TABLE IF NOT EXISTS produk (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_produk VARCHAR(100) NOT NULL
);

-- Tabel pesanan
CREATE TABLE IF NOT EXISTS pesanan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_pembeli INT,
  id_produk INT,
  jumlah INT,
  total INT,
  tanggal DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_pembeli) REFERENCES pembeli(id),
  FOREIGN KEY (id_produk) REFERENCES produk(id)
);
