// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegistroEntrada from "./components/RegistroEntrada";
import RegistroSalida from "./components/RegistroSalida";
import VisitantesTiempoReal from "./components/VisitantesTiempoReal";
import ReportesVisitantes from "./components/ReportesVisitantes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro-entrada" element={<RegistroEntrada />} />
        <Route path="/registro-salida" element={<RegistroSalida />} />
        <Route path="/tiempo-real" element={<VisitantesTiempoReal />} />
        <Route path="/reporte" element={<ReportesVisitantes />} />
      </Routes>
    </Router>
  );
}

export default App;
