// src/admin/AdminPesanan.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminPesanan() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const snap = await getDocs(collection(db, "orders"));
    setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const konfirmasiBayar = async (id) => {
    await updateDoc(doc(db, "orders", id), { isPaid: true });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Daftar Pesanan</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            <strong>{o.namaProduk}</strong> | Cabang: {o.branchId} | Status: {o.status}
            <br />
            {o.isPaid ? "Sudah dibayar" : (
              <button onClick={() => konfirmasiBayar(o.id)}>Konfirmasi Pembayaran</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
