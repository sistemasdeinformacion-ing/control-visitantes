import React, { useEffect, useState } from "react";
import "./VisitantesTiempoReal.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function extraerYMD(input) {
  if (!input) return null;
  const s = String(input);
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return { y: m[1], m: m[2], d: m[3] };
}

function formatearFecha(input) {
  const p = extraerYMD(input);
  if (!p) return "";
  return `${p.d}-${p.m}-${p.y}`;
}

function formatearHora12(hora) {
  if (!hora) return "";
  const [h, m] = String(hora).split(":");
  const fecha = new Date();
  fecha.setHours(parseInt(h || "0", 10), parseInt(m || "0", 10), 0, 0);
  return fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
}

const VisitantesTiempoReal = () => {
  const [visitantes, setVisitantes] = useState([]);
  const navigate = useNavigate();

  const obtenerVisitantes = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/api/visitantes/activos`);
      if (!respuesta.ok) {
        throw new Error("No se pudo obtener la lista de visitantes");
      }
      const data = await respuesta.json();
      setVisitantes(data);
    } catch (error) {
      console.error("Error al cargar visitantes en tiempo real:", error);
    }
  };

  useEffect(() => {
    obtenerVisitantes();
    const interval = setInterval(obtenerVisitantes, 10000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tiempo-real-container">
      <div className="tiempo-real-box">
        <img
          src={logo}
          alt="Logo"
          className="logo-tiempo-real"
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        />

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
                <p><strong>Fecha:</strong> {formatearFecha(v.fecha)}</p>
                <p><strong>Hora Entrada:</strong> {formatearHora12(v.horaEntrada)}</p>
              </div>
            ))
          ) : (
            <p className="no-visitantes" style={{ marginTop: "30px" }}>
              No hay visitantes en este momento.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitantesTiempoReal;