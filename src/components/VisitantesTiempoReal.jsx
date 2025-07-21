import React, { useEffect, useState } from "react";
import "./VisitantesTiempoReal.css";
import logo from "../assets/logo.png";

const VisitantesTiempoReal = () => {
  const [visitantes, setVisitantes] = useState([]);

useEffect(() => {
  const obtenerVisitantes = async () => {
    try {
      const respuesta = await fetch("http://localhost:3001/api/visitantes/activos");
      const data = await respuesta.json();
      setVisitantes(data);
    } catch (error) {
      console.error("Error al cargar visitantes en tiempo real:", error);
    }
  };

  obtenerVisitantes();
}, []);

  return (
    <div className="tiempo-real-container">
      <div className="tiempo-real-box">
        <img src={logo} alt="Logo" className="logo-tiempo-real" />
        <h2>
          <span className="titulo-negro">VISITANTES</span>{" "}
          <span className="titulo-azul">TIEMPO REAL</span>
        </h2>

        <div className="cards-container">
          {visitantes.length > 0 ? (
            visitantes.map((v, index) => (
              <div key={index} className="card-visitante">
                <p><strong>Nombre:</strong> {v.nombre}</p>
                <p><strong>Documento:</strong> {v.documento}</p>
                <p><strong>Dependencia:</strong> {v.dependencia}</p>
                <p><strong>Funcionario a visitar:</strong> {v.funcionario}</p>
                <p><strong>Fecha:</strong> {v.fecha}</p>
                <p><strong>Hora Entrada:</strong> {v.hora}</p>
              </div>
            ))
          ) : (
            <p style={{ marginTop: "30px" }}>No hay visitantes en este momento.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitantesTiempoReal;
