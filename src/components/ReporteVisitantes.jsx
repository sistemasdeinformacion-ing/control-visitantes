import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ReporteVisitantes.css";
import logo from "../assets/logo.png";
import iconoCalendario from "../assets/icono-calendario.png";
import iconoDescarga from "../assets/icono-descarga.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ReporteVisitantes = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(() => {
    const hoy = new Date().toISOString().split("T")[0];
    return hoy;
  });

  const navigate = useNavigate();

  const [visitantes, setVisitantes] = useState([]);
  const logoRef = useRef(null);

  useEffect(() => {
    const obtenerVisitantes = async () => {
      try {
        const respuesta = await fetch(`http://localhost:3001/api/visitantes/reporte?fecha=${fechaSeleccionada}`);
        const data = await respuesta.json();
        setVisitantes(data);
      } catch (error) {
        console.error("Error al cargar los visitantes:", error);
      }
    };

    obtenerVisitantes();
  }, [fechaSeleccionada]);

  const handleExportar = () => {
    const doc = new jsPDF();
    const vigilanteData = JSON.parse(localStorage.getItem("vigilante"));
    const vigilanteTexto = vigilanteData
      ? `Vigilante: ${vigilanteData.nombre} - ${vigilanteData.documento}`
      : "Vigilante: No identificado";


    const img = logoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const logoData = canvas.toDataURL("image/png");

    doc.addImage(logoData, "PNG", 10, 10, 30, 30);
    doc.setFontSize(16);
    doc.text("Reporte de Visitantes", 50, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${fechaSeleccionada}`, 50, 28);
    doc.text(vigilanteTexto, 50, 34);


    if (visitantes.length === 0) {
      doc.text("No hay registros para esta fecha.", 14, 50);
    } else {
      const columnas = [
        "Nombre",
        "Documento",
        "Dependencia",
        "Funcionario",
        "Hora Entrada",
        "Hora Salida",
        "Vigilante"
      ];

      const filas = visitantes.map((v) => [
        v.nombre,
        v.documento,
        v.dependencia,
        v.funcionario,
        v.horaEntrada,
        v.horaSalida || "----",
        v.nombreVigilante || "----"
      ]);

      autoTable(doc, {
        startY: 45,
        head: [columnas],
        body: filas,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 45 },
      });
    }

    doc.save(`reporte_visitantes_${fechaSeleccionada}.pdf`);
  };

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return ``;
  };

  return (
    <div className="reporte-container">
      <div className="reporte-box">
        <img src={logo} alt="Logo" style={{ display: "none" }} ref={logoRef} />

        <img
          src={logo}
          alt="Logo"
          className="logo-reporte"
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        />

        <h2>
          <span className="titulo-negro">REPORTES</span>{" "}
          <span className="titulo-azul">VISITANTES</span>
        </h2>

        <div className="filtros">
          <div className="input-fecha">
            <img src={iconoCalendario} alt="Calendario" className="icono-img" />
            <input
              type="date"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
            />
          </div>
          <button className="btn-exportar" onClick={handleExportar}>
            <img src={iconoDescarga} alt="Descargar" className="icono-img" />
          </button>
        </div>

        <div className="cards-container">
          {visitantes.length > 0 ? (
            visitantes.map((v, index) => (
              <div key={index} className="card-visitante">
                <p><strong>Nombre:</strong> {v.nombre}</p>
                <p><strong>Documento:</strong> {v.documento}</p>
                <p><strong>Dependencia:</strong> {v.dependencia}</p>
                <p><strong>Funcionario a visitar:</strong> {v.funcionario}</p>
                <p><strong>Fecha:</strong> {formatearFecha(v.fecha)}</p>
                <p><strong>Hora Entrada:</strong> {v.horaEntrada}</p>
                <p><strong>Hora Salida:</strong> {v.horaSalida}</p>
              </div>
            ))
          ) : (
            <p className="no-reporte" style={{ marginTop: "30px" }}>No hay registros para esta fecha.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReporteVisitantes;
