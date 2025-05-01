import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function DashboardAdmin() {
  const [cabang, setCabang] = useState([]);
  const [produk, setProduk] = useState([]);
  const [kurir, setKurir] = useState([]);
  const [pesanan, setPesanan] = useState([]);

  useEffect(() => {
    const ambilSemuaData = async () => {
      const c = await getDocs(collection(db, "cabang"));
      const p = await getDocs(collection(db, "products"));
      const k = await getDocs(collection(db, "kurir"));
      const o = await getDocs(collection(db, "orders"));

      setCabang(c.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setProduk(p.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setKurir(k.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setPesanan(o.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    ambilSemuaData();
  }, []);

  return (
    <div>
      <h1>Admin Pusat</h1>

      <h2>Cabang Toko</h2>
      {cabang.map(c => <p key={c.id}>{c.nama} - {c.lokasi}</p>)}

      <h2>Produk Semua Toko</h2>
      {produk.map(p => <p key={p.id}>{p.nama} - Rp {p.harga}</p>)}

      <h2>Kurir Terdaftar</h2>
      {kurir.map(k => <p key={k.id}>{k.nama} - {k.tipe}</p>)}

      <h2>Semua Pesanan</h2>
      {pesanan.map(p => (
        <div key={p.id}>
          <p>{p.namaProduk} | Qty: {p.qty} | Status: {p.status}</p>
        </div>
      ))}
    </div>
  );
}
