// lib/firebase/orders.js
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const saveOrderToFirebase = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: serverTimestamp(),
      status: "Belum Dibayar",
    });
    return docRef.id;
  } catch (error) {
    console.error("Gagal simpan order:", error);
    return null;
  }
};
