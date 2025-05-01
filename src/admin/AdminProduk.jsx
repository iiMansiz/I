// src/admin/AdminProduk.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function AdminProduk() {
  const [produk, setProduk] = useState({ nama: "", harga: "", stok: "", branchId: "" });
  const [produkList, setProdukList] = useState([]);
  const [cabangList, setCabangList] = useState([]);

  const fetchProduk = async () => {
    const snap = await getDocs(collection(db, "products"));
    setProdukList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchCabang = async () => {
    const snap = await getDocs(collection(db, "branches"));
    setCabangList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const tambahProduk = async () => {
    const { nama, harga, stok, branchId } = produk;
    if (!nama || !harga || !stok || !branchId) return alert("Lengkapi semua data");
    await addDoc(collection(db, "products"), {
      ...produk,
      harga: parseInt(harga),
      stok: parseInt(stok)
    });
    setProduk({ nama: "", harga: "", stok: "", branchId: "" });
    fetchProduk();
  };

  useEffect(() => {
    fetchProduk();
    fetchCabang();
  }, []);

  return (
    <div>
      <h2>Manajemen Produk</h2>
      <input placeholder="Nama Produk" value={produk.nama} onChange={e => setProduk({ ...produk, nama: e.target.value })} />
      <input placeholder="Harga" value={produk.harga} onChange={e => setProduk({ ...produk, harga: e.target.value })} />
      <input placeholder="Stok" value={produk.stok} onChange={e => setProduk({ ...produk, stok: e.target.value })} />
      <select value={produk.branchId} onChange={e => setProduk({ ...produk, branchId: e.target.value })}>
        <option value="">Pilih Cabang</option>
        {cabangList.map(c => <option key={c.id} value={c.id}>{c.nama}</option>)}
      </select>
      <button onClick={tambahProduk}>Tambah Produk</button>

      <ul>
        {produkList.map(p => (
          <li key={p.id}>{p.nama} - Rp{p.harga} - Stok: {p.stok}</li>
        ))}
      </ul>
    </div>
  );
}
