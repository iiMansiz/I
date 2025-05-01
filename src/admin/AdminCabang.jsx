// src/admin/AdminCabang.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function AdminCabang() {
  const [namaCabang, setNamaCabang] = useState("");
  const [cabangList, setCabangList] = useState([]);

  const fetchCabang = async () => {
    const snap = await getDocs(collection(db, "branches"));
    setCabangList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const tambahCabang = async () => {
    if (namaCabang === "") return alert("Nama tidak boleh kosong");
    await addDoc(collection(db, "branches"), { nama: namaCabang });
    setNamaCabang("");
    fetchCabang();
  };

  const hapusCabang = async (id) => {
    await deleteDoc(doc(db, "branches", id));
    fetchCabang();
  };

  useEffect(() => {
    fetchCabang();
  }, []);

  return (
    <div>
      <h2>Manajemen Cabang</h2>
      <input value={namaCabang} onChange={e => setNamaCabang(e.target.value)} placeholder="Nama Cabang" />
      <button onClick={tambahCabang}>Tambah</button>
      <ul>
        {cabangList.map(c => (
          <li key={c.id}>
            {c.nama} <button onClick={() => hapusCabang(c.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
