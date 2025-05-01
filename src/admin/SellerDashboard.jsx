import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";

export default function SellerDashboard({ user }) {
  const [produk, setProduk] = useState([]);
  const [pesanan, setPesanan] = useState([]);
  const branchId = user.uid; // diasumsikan UID cabang

  const fetchProduk = async () => {
    const q = query(collection(db, "products"), where("branchId", "==", branchId));
    const snap = await getDocs(q);
    setProduk(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const fetchPesanan = async () => {
    const q = query(collection(db, "orders"), where("branchId", "==", branchId));
    const snap = await getDocs(q);
    setPesanan(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
    fetchPesanan();
  };

  useEffect(() => {
    fetchProduk();
    fetchPesanan();
  }, []);

  return (
    <div>
      <h2>Dashboard Cabang</h2>
      <h3>Produk</h3>
      <ul>
        {produk.map(p => <li key={p.id}>{p.nama}</li>)}
      </ul>

      <h3>Pesanan</h3>
      <ul>
        {pesanan.map(o => (
          <li key={o.id}>
            {o.namaProduk} - Status: {o.status}
            <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
              <option value="Belum Dibayar">Belum Dibayar</option>
              <option value="Dikemas">Dikemas</option>
              <option value="Dikirim">Dikirim</option>
              <option value="Selesai">Selesai</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
