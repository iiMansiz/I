// components/CheckoutForm.js
import { useState, useEffect } from "react";
import { getOngkir } from "@/utils/rajaongkir";

export default function CheckoutForm({ products, user }) {
  const [alamat, setAlamat] = useState({
    provinsi_id: "",
    kota_id: "",
    detail: "",
  });

  const [kurir, setKurir] = useState("jne");
  const [layanan, setLayanan] = useState([]);
  const [selectedLayanan, setSelectedLayanan] = useState(null);

  useEffect(() => {
    if (alamat.kota_id) {
      getOngkir("501", alamat.kota_id, 1000, kurir).then((data) =>
        setLayanan(data)
      );
    }
  }, [alamat.kota_id, kurir]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      userId: user.uid,
      products,
      alamatTujuan: alamat,
      courier: selectedLayanan,
      status: "Belum Dibayar",
      isPaid: false,
    };

    await saveOrderToFirebase(order);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Provinsi ID"
        onChange={(e) => setAlamat({ ...alamat, provinsi_id: e.target.value })}
      />
      <input
        placeholder="Kota ID"
        onChange={(e) => setAlamat({ ...alamat, kota_id: e.target.value })}
      />
      <input
        placeholder="Alamat lengkap"
        onChange={(e) => setAlamat({ ...alamat, detail: e.target.value })}
      />

      <select onChange={(e) => setKurir(e.target.value)}>
        <option value="jne">JNE</option>
        <option value="jnt">J&T</option>
        <option value="sicepat">SiCepat</option>
      </select>

      <select onChange={(e) => setSelectedLayanan(JSON.parse(e.target.value))}>
        {layanan.map((layanan, idx) => (
          <option key={idx} value={JSON.stringify(layanan)}>
            {layanan.service} - {layanan.cost[0].value} ({layanan.cost[0].etd} hari)
          </option>
        ))}
      </select>

      <button type="submit">Buat Pesanan</button>
    </form>
  );
}
