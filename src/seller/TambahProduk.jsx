import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function TambahProduk() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  const handleTambah = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Login dulu");

    await addDoc(collection(db, "products"), {
      nama,
      harga: parseInt(harga),
      sellerId: user.uid,
      createdAt: new Date()
    });

    alert("Produk ditambahkan");
    setNama("");
    setHarga("");
  };

  return (
    <form onSubmit={handleTambah}>
      <h2>Tambah Produk</h2>
      <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama produk" />
      <input value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="Harga" type="number" />
      <button type="submit">Simpan</button>
    </form>
  );
}
