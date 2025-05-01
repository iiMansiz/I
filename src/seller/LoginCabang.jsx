import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginCabang({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, pass);
      onLogin(user.user);
    } catch (err) {
      alert("Login gagal");
    }
  };

  return (
    <div>
      <h2>Login Cabang</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" />
      <button onClick={login}>Masuk</button>
    </div>
  );
}
