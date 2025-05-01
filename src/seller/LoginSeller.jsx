import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function LoginSeller() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const sellerDoc = await getDoc(doc(db, "sellers", userCredential.user.uid));
      if (!sellerDoc.exists()) {
        alert("Bukan akun seller cabang!");
        return;
      }
      // Simpan ke localStorage atau context
      alert("Login berhasil");
    } catch (error) {
      alert("Login gagal: " + error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login Seller</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
