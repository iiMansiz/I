import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  useEffect(() => {
    const ambilProduk = async () => {
      const docSnap = await getDoc(doc(db, "products", id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNama(data.nama);
        setHarga(data.harga);
      } else {
        alert("Produk tidak ditemukan");
        navigate("/dashboard-seller");
      }
    };
    ambilProduk();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "products", id), {
      nama,
      harga: parseInt(harga)
    });
    alert("Produk diperbarui");
    navigate("/dashboard-seller");
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Produk</h2>
      <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Produk" />
      <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="Harga" />
      <button type="submit">Update</button>
    </form>
  );
}
