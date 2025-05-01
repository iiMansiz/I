import { useEffect, useState } from "react";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function PesananMasuk() {
  const [pesanan, setPesanan] = useState([]);

  useEffect(() => {
    const ambilPesanan = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const q = query(collection(db, "orders"), where("sellerId", "==", user.uid));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPesanan(data);
    };
    ambilPesanan();
  }, []);

  const ubahStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
    alert("Status diubah ke " + status);
  };

  return (
    <div>
      <h2>Pesanan Masuk</h2>
      {pesanan.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><strong>{p.namaProduk}</strong></p>
          <p>Jumlah: {p.qty} | Total: Rp {p.total}</p>
          <p>Status: {p.status}</p>
          {p.status === "Belum Diproses" && (
            <>
              <button onClick={() => ubahStatus(p.id, "Dikemas")}>Kemas</button>
              <button onClick={() => ubahStatus(p.id, "Ditolak")}>Tolak</button>
            </>
          )}
          {p.status === "Dikemas" && (
            <button onClick={() => ubahStatus(p.id, "Dikirim")}>Kirim</button>
          )}
        </div>
      ))}
    </div>
  );
}
