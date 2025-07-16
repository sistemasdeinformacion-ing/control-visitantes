// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RegistroEntrada from "./components/RegistroEntrada";
import RegistroSalida from "./components/RegistroSalida";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro-entrada" element={<RegistroEntrada />} />
        <Route path="/registro-salida" element={<RegistroSalida />} />
      </Routes>
    </Router>
  );
}

export default App;
