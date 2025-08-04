import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegistroEntrada from "./components/RegistroEntrada";
import RegistroSalida from "./components/RegistroSalida";
import VisitantesTiempoReal from "./components/VisitantesTiempoReal";
import ReporteVisitantes from "./components/ReporteVisitantes";
import RegistroVigilante from "./components/RegistroVigilante";
import ControlVigilante from "./components/ControlVigilante";
import LoginVigilante from "./components/LoginVigilante";
import Landing from "./components/Landing";
import LoginAdmin from "./components/LoginAdmin";
import HomeAdministrador from "./components/HomeAdministrador";
import ModuloVigilantes from "./components/ModuloVigilantes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/control-vigilante" element={<ControlVigilante />} />
        <Route path="/login-vigilante/:documento" element={<LoginVigilante />} /> {/* Nuevo login */}
        <Route path="/home" element={<Home />} />
        <Route path="/registrar-vigilante" element={<RegistroVigilante />} />
        <Route path="/registro-entrada" element={<RegistroEntrada />} />
        <Route path="/registro-salida" element={<RegistroSalida />} />
        <Route path="/tiempo-real" element={<VisitantesTiempoReal />} />
        <Route path="/reportes" element={<ReporteVisitantes />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/admin-panel" element={<HomeAdministrador />} />
        <Route path="/modulo-vigilantes" element={<ModuloVigilantes />} />
      </Routes>
    </Router>
  );
}

export default App;