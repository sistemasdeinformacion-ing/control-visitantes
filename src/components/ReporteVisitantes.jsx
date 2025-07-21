import React, { useState, useRef } from "react";
import "./ReporteVisitantes.css";
import logo from "../assets/logo.png";
import iconoCalendario from "../assets/icono-calendario.png";
import iconoDescarga from "../assets/icono-descarga.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const visitantesMock = [
    {
        nombre: "Ana María Romero",
        documento: "1099708595",
        dependencia: "*************",
        funcionario: "*************",
        fecha: "2025-07-15",
        horaEntrada: "2:30pm",
        horaSalida: "3:00pm",
    },
    {
        nombre: "Carlos Pérez",
        documento: "1234567890",
        dependencia: "SUBGERENCIA ADMINISTRATIVA Y FINANCIERA",
        funcionario: "Juan López",
        fecha: "2025-07-15",
        horaEntrada: "10:00am",
        horaSalida: "11:00am",
    },
    {
        nombre: "María García",
        documento: "0987654321",
        dependencia: "SECRETARÍA GENERAL",
        funcionario: "Ana Torres",
        fecha: "2025-07-15",
        horaEntrada: "1:00pm",
        horaSalida: "2:00pm",
    },
];

const ReporteVisitantes = () => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState("2025-07-15");
    const reporteRef = useRef();

    const visitantesFiltrados = visitantesMock.filter(
        (v) => v.fecha === fechaSeleccionada
    );

    const handleExportar = () => {
        const input = reporteRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 10, pageWidth, imgHeight);
            pdf.save(`reporte_visitantes_${fechaSeleccionada}.pdf`);
        });
    };

    return (
        <div className="reporte-container">
            <div className="reporte-box" ref={reporteRef}>
                <img src={logo} alt="Logo" className="logo-reporte" />
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
                    {visitantesFiltrados.map((v, index) => (
                        <div key={index} className="card-visitante">
                            <p><strong>Nombre:</strong> {v.nombre}</p>
                            <p><strong>Documento:</strong> {v.documento}</p>
                            <p><strong>Dependencia:</strong> {v.dependencia}</p>
                            <p><strong>Funcionario a visitar:</strong> {v.funcionario}</p>
                            <p><strong>Fecha:</strong> {v.fecha}</p>
                            <p><strong>Hora Entrada:</strong> {v.horaEntrada}</p>
                            <p><strong>Hora Salida:</strong> {v.horaSalida}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReporteVisitantes;
