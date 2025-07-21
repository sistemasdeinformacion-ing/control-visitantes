import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegistroEntrada from "./components/RegistroEntrada";
import RegistroSalida from "./components/RegistroSalida";
import VisitantesTiempoReal from "./components/VisitantesTiempoReal";
import ReporteVisitantes from "./components/ReporteVisitantes";
import RegistroVigilante from "./components/RegistroVigilante";



import ControlVigilante from "./components/ControlVigilante";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ControlVigilante />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registrar-vigilante" element={<RegistroVigilante />} />
        <Route path="/registro-entrada" element={<RegistroEntrada />} />
        <Route path="/registro-salida" element={<RegistroSalida />} />
        <Route path="/tiempo-real" element={<VisitantesTiempoReal />} />
        <Route path="/reportes" element={<ReporteVisitantes />} />
      </Routes>
    </Router>
  );
}

export default App;
