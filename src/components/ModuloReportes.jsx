import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import logo from '../assets/logo.png';
import './ModuloReportes.css';

const ModuloReportes = () => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [datos, setDatos] = useState([]);

    const cargarReportes = async () => {
        if (!fechaInicio || !fechaFin) {
            alert('Selecciona un rango de fechas');
            return;
        }
        try {
            const res = await axios.get(`http://localhost:4000/api/reportes`, {
                params: { fechaInicio, fechaFin },
            });
            setDatos(res.data);
        } catch (error) {
            console.error('Error al cargar reportes:', error);
        }
    };

    const descargarExcel = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/reportes/excel`, {
                params: { fechaInicio, fechaFin },
                responseType: 'blob',
            });
            saveAs(res.data, 'reportes.xlsx');
        } catch (error) {
            console.error('Error al descargar Excel:', error);
        }
    };

    const descargarPDF = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/reportes/pdf`, {
                params: { fechaInicio, fechaFin },
                responseType: 'blob',
            });
            saveAs(res.data, 'reportes.pdf');
        } catch (error) {
            console.error('Error al descargar PDF:', error);
        }
    };

    return (
        <div>
            <div className='header-reporte'>
                <img src={logo} alt="Logo"
                    className="modulo-logo" onClick={() => (window.location.href = "/admin-panel")} />

                <h2 className="reporte-title">Módulo de Reportes</h2>
            </div>
            <div className="reporte-filtros">
                <label>Fecha inicio:</label>
                <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />

                <label>Fecha fin:</label>
                <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />

                <button onClick={cargarReportes}>Cargar</button>
            </div>

            <table className="reporte-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Fecha</th>
                        <th>Hora Entrada</th>
                        <th>Hora Salida</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map(v => (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.nombre}</td>
                            <td>{v.documento}</td>
                            <td>{new Date(v.fecha).toLocaleDateString('es-ES')}</td>
                            <td>{v.hora_entrada}</td>
                            <td>{v.hora_salida}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="reporte-descargas">
                <button className="btn-excel" onClick={descargarExcel}>Descargar Excel</button>
                <button className="btn-pdf" onClick={descargarPDF}>Descargar PDF</button>
            </div>
        </div>
    );
};

export default ModuloReportes;