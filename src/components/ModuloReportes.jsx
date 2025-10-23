import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import logo from '../assets/logo.png';
import Mensaje from './Mensaje';
import './ModuloReportes.css';

const API_BASE = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/reportes`
    : 'https://backend-vb5s.onrender.com/api/reportes';

const ModuloReportes = () => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [datos, setDatos] = useState([]);
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

    useEffect(() => {
        if (!mensaje.texto) return;
        const t = setTimeout(() => setMensaje({ texto: '', tipo: '' }), 5000);
        return () => clearTimeout(t);
    }, [mensaje]);

    const cargarReportes = async () => {
        if (!fechaInicio || !fechaFin) {
            setMensaje({ texto: 'Debes seleccionar un rango de fechas.', tipo: 'error' });
            return;
        }
        setMensaje({ texto: '', tipo: '' });
        try {
            const res = await axios.get(API_BASE, { params: { fechaInicio, fechaFin } });
            setDatos(res.data || []);
            if (!res.data || res.data.length === 0) {
                setMensaje({ texto: 'No hay datos para el rango de fechas seleccionado.', tipo: 'error' });
            } else {
                setMensaje({ texto: 'Reportes cargados.', tipo: 'exito' });
            }
        } catch (err) {
            console.error('Error al cargar reportes:', err);
            setMensaje({ texto: 'Error al cargar los reportes.', tipo: 'error' });
        }
    };

    const descargarExcel = async () => {
        if (!fechaInicio || !fechaFin) {
            setMensaje({ texto: 'Debes seleccionar un rango de fechas antes de descargar.', tipo: 'error' });
            return;
        }
        setMensaje({ texto: '', tipo: '' });
        try {
            const res = await axios.get(`${API_BASE}/excel`, {
                params: { fechaInicio, fechaFin },
                responseType: 'blob',
            });
            const contentType = res.headers['content-type'] || 'application/octet-stream';
            const blob = new Blob([res.data], { type: contentType });
            saveAs(blob, 'reportes_visitantes.xlsx');
            setMensaje({ texto: 'Descarga Excel iniciada.', tipo: 'exito' });
        } catch (err) {
            console.error('Error al descargar Excel:', err);
            setMensaje({ texto: 'Error al descargar el archivo Excel.', tipo: 'error' });
        }
    };

    const descargarPDF = async () => {
        if (!fechaInicio || !fechaFin) {
            setMensaje({ texto: 'Debes seleccionar un rango de fechas antes de descargar.', tipo: 'error' });
            return;
        }
        setMensaje({ texto: '', tipo: '' });
        try {
            const res = await axios.get(`${API_BASE}/pdf`, {
                params: { fechaInicio, fechaFin },
                responseType: 'blob',
            });
            const contentType = res.headers['content-type'] || 'application/pdf';
            const blob = new Blob([res.data], { type: contentType });
            saveAs(blob, 'reportes_visitantes.pdf');
            setMensaje({ texto: 'Descarga PDF iniciada.', tipo: 'exito' });
        } catch (err) {
            console.error('Error al descargar PDF:', err);
            setMensaje({ texto: 'Error al descargar el archivo PDF.', tipo: 'error' });
        }
    };

    return (
        <div>
            <div className="header-reporte">
                <img
                    src={logo}
                    alt="Logo"
                    className="modulo-logo"
                    onClick={() => (window.location.href = '/admin-panel')}
                />
                <h2 className="reporte-title">Módulo de Reportes</h2>
            </div>

            <div className="reporte-filtros">
                <label>Fecha inicio:</label>
                <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />

                <label>Fecha fin:</label>
                <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />

                <button className="btn-cargar" onClick={cargarReportes}>Cargar</button>
            </div>

            {mensaje.texto && <Mensaje texto={mensaje.texto} tipo={mensaje.tipo} />}

            <div className="table-wrap">
                <table className="reporte-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Teléfono</th>
                            <th>Fecha</th>
                            <th>Hora Entrada</th>
                            <th>Hora Salida</th>
                            <th>Vigilante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map(v => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.nombre}</td>
                                <td>{v.documento}</td>
                                <td>{v.telefono || "----"}</td>
                                <td>{v.fecha || ''}</td>
                                <td>{v.hora_entrada}</td>
                                <td>{v.hora_salida || "----"}</td>
                                <td>{v.nombreVigilante || "----"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="reporte-descargas">
                <button className="btn-excel" onClick={descargarExcel}>Descargar Excel</button>
                <button className="btn-pdf" onClick={descargarPDF}>Descargar PDF</button>
            </div>
        </div>
    );
};

export default ModuloReportes;