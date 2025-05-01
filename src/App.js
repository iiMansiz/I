// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginAdmin from "./admin/LoginAdmin";
import DashboardAdmin from "./admin/DashboardAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/cabang" element={<AdminCabang />} />
        <Route path="/admin/produk" element={<AdminProduk />} />
      </Routes>
    </Router>
  );
}

export default App;
