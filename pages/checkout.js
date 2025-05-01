import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { saveOrderToFirebase } from "@/lib/firebase/orders";
import { getAuth } from "firebase/auth";

export default function CheckoutPage() {
  const [alamat, setAlamat] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Ambil cart dari localStorage atau state global
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    setTotalHarga(savedCart.reduce((total, item) => total + item.price * item.qty, 0));
  }, []);

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    const orderData = {
      userId: user.uid,
      alamat,
      items: cartItems,
      total: totalHarga,
      metodePembayaran: "Transfer Bank",
      isPaid: false,
    };

    const orderId = await saveOrderToFirebase(orderData);
    if (orderId) {
      localStorage.removeItem("cart");
      router.push(`/checkout/${orderId}`);
    } else {
      alert("Gagal membuat pesanan.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout</h2>
      <div>
        <label>Alamat Pengiriman:</label>
        <textarea
          rows={3}
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          placeholder="Masukkan alamat lengkap"
          style={{ width: "100%", marginBottom: 10 }}
        />
      </div>

      <h4>Ringkasan Pesanan:</h4>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} x {item.qty} - Rp {item.price * item.qty}
          </li>
        ))}
      </ul>

      <h4>Total: Rp {totalHarga}</h4>

      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        Buat Pesanan
      </button>
    </div>
  );
}
