// utils/rajaongkir.js
import axios from "axios";

const API_KEY = "API_KEY_KAMU";
const BASE_URL = "https://api.rajaongkir.com/starter"; // atau 'pro' jika kamu pakai Pro

export const getOngkir = async (origin, destination, weight, courier) => {
  const res = await axios.post(`${BASE_URL}/cost`, {
    origin,
    destination,
    weight,
    courier,
  }, {
    headers: {
      key: API_KEY,
      "content-type": "application/x-www-form-urlencoded"
    }
  });

  return res.data.rajaongkir.results[0].costs;
};
