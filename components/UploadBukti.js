// components/UploadBukti.js
import { useState } from "react";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function UploadBukti({ orderId }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const storageRef = ref(storage, `bukti/${orderId}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "orders", orderId), {
      buktiBayar: url,
      status: "Menunggu Konfirmasi",
    });

    setIsUploading(false);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Mengunggah..." : "Upload Bukti"}
      </button>
    </div>
  );
}
