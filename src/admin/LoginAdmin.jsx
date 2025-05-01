// src/admin/LoginAdmin.jsx
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Gagal login");
    }
  };

  return (
    <div>
      <h1>Login Admin Pusat</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={login}>Masuk</button>
    </div>
  );
}
