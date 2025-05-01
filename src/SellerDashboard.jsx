import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [sellerId, setSellerId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setSellerId(user.uid);
        const q = query(collection(db, "products"), where("sellerId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } else {
        navigate("/login-seller");
      }
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h2>Dashboard Seller</h2>
      <button onClick={() => navigate("/tambah-produk")}>Tambah Produk</button>
      <h3>Produk Anda</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.nama} - Rp {p.harga}
            <button onClick={() => navigate(`/edit-produk/${p.id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
