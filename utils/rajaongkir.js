import axios from "axios";
const API_KEY = "RAJAONGKIR_API_KEY";
const BASE_URL = "https://api.rajaongkir.com/starter";

export const getOngkir = async (origin, destination, weight, courier) => {
  const form = new URLSearchParams();
  form.append("origin", origin);
  form.append("destination", destination);
  form.append("weight", weight);
  form.append("courier", courier);

  const res = await axios.post(`${BASE_URL}/cost`, form, {
    headers: {
      key: API_KEY,
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  return res.data.rajaongkir.results[0].costs;
};
