import React from "react";
import "./VisitantesTiempoReal.css";
import logo from "../assets/logo.png";

const visitantesEjemplo = [
  {
    nombre: "Ana María Romero",
    documento: "1099708595",
    dependencia: "*************",
    funcionario: "*************",
    fecha: "15/07/2025",
    hora: "2:30pm",
  },
  {
    nombre: "Ana María Romero",
    documento: "1099708595",
    dependencia: "*************",
    funcionario: "*************",
    fecha: "15/07/2025",
    hora: "2:30pm",
  },
  {
    nombre: "Ana María Romero",
    documento: "1099708595",
    dependencia: "*************",
    funcionario: "*************",
    fecha: "15/07/2025",
    hora: "2:30pm",
  },
];

const VisitantesTiempoReal = () => {
  return (
    <div className="tiempo-real-container">
      <div className="tiempo-real-box">
        <img src={logo} alt="Logo" className="logo-tiempo-real" />
        <h2>
          <span className="titulo-negro">VISITANTES</span>{" "}
          <span className="titulo-azul">TIEMPO REAL</span>
        </h2>

        <div className="cards-container">
          {visitantesEjemplo.map((v, index) => (
            <div key={index} className="card-visitante">
              <p><strong>Nombre:</strong> {v.nombre}</p>
              <p><strong>Documento:</strong> {v.documento}</p>
              <p><strong>Dependencia:</strong> {v.dependencia}</p>
              <p><strong>Funcionario a visitar:</strong> {v.funcionario}</p>
              <p><strong>Fecha:</strong> {v.fecha}</p>
              <p><strong>Hora Entrada:</strong> {v.hora}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitantesTiempoReal;
