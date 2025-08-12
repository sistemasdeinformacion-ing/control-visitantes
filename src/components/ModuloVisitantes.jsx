import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.png";
import "./ModuloVisitantes.css";
import verIcon from "../assets/visualizar.png";
import editarIcon from "../assets/editar.png";
import eliminarIcon from "../assets/eliminar.png";
import AdminFooter from "./AdminFooter";

const API = import.meta.env.VITE_API_URL;

export default function ModuloVisitantes() {
    const navigate = useNavigate();

    const [visitantes, setVisitantes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        documento: "",
        dependencia: "",
        funcionario: "",
        fecha: "",
        horaEntrada: "",
        documentoVigilante: ""
    });

    useEffect(() => {
        cargarVisitantes();
    }, []);

    const cargarVisitantes = async () => {
        try {
            const res = await axios.get(`${API}/api/visitantes`);
            setVisitantes(res.data);
        } catch (error) {
            console.error("Error al cargar visitantes:", error);
        }
    };

    const registrarEntrada = async (nuevo) => {
        await axios.post(`${API}/api/visitantes/entrada`, nuevo);
    };

    const registrarSalida = async (documento, horaSalida) => {
        await axios.post(`${API}/api/visitantes/salida`, {
            documento,
            fechaSalida: new Date().toISOString().split("T")[0],
            horaSalida
        });
    };

    const abrirModalEditar = (visitante) => {
        setFormData(visitante);
        setModoEdicion(true);
        setModalAbierto(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modoEdicion) {
                await registrarSalida(formData.documento, formData.horaSalida || new Date().toLocaleTimeString());
                await registrarEntrada(formData);
            } else {
                await registrarEntrada(formData);
            }
            setModalAbierto(false);
            setFormData({
                nombre: "",
                documento: "",
                dependencia: "",
                funcionario: "",
                fecha: "",
                horaEntrada: "",
                documentoVigilante: ""
            });
            setModoEdicion(false);
            cargarVisitantes();
        } catch (error) {
            console.error("Error al guardar visitante:", error);
        }
    };

    const handleEliminar = async (documento) => {
        if (window.confirm("¿Seguro que deseas registrar la salida de este visitante?")) {
            try {
                await registrarSalida(documento, new Date().toLocaleTimeString());
                cargarVisitantes();
            } catch (error) {
                console.error("Error al registrar salida:", error);
            }
        }
    };

    const visitantesFiltrados = visitantes.filter(v =>
        v.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        v.documento?.includes(busqueda)
    );

    return (
        <div className="modulo-container">
            <div className="modulo-sidebar">
                <img
                    src={Logo}
                    alt="Logo"
                    className="modulo-logo"
                    onClick={() => navigate("/admin-panel")}
                />

                <div className="modulo-nav">
                    <button className="nav-btn" onClick={() => navigate("/modulo-vigilantes")}>
                        VIGILANTES
                    </button>
                    <button className="nav-btn" onClick={() => navigate("/modulo-reportes")}>
                        REPORTES
                    </button>
                </div>

                <div className="modulo-user">
                    <AdminFooter />
                </div>
            </div>

            <div className="modulo-content">
                <div className="modulo-header">
                    <div className="admin-name">{localStorage.getItem("adminNombre")}</div>
                    <div className="admin-label">ADMINISTRADOR</div>
                </div>

                <h2 className="modulo-title">Módulo de Visitantes</h2>

                <div className="acciones-superiores">
                    <input
                        type="text"
                        placeholder="Buscar visitante..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="tabla-visitantes">
                    {visitantesFiltrados.map((v) => (
                        <div className="fila" key={v.id}>
                            <div className="nombre">{v.nombre}</div>
                            <div className="acciones">
                                <img src={verIcon} alt="Ver" title="Ver" />
                                <img src={editarIcon} alt="Editar" title="Editar" onClick={() => abrirModalEditar(v)} />
                                <img src={eliminarIcon} alt="Salida" title="Registrar salida" onClick={() => handleEliminar(v.documento)} />
                            </div>
                        </div>
                    ))}

                    {visitantesFiltrados.length === 0 && (
                        <div className="vacio">No se encontraron visitantes.</div>
                    )}
                </div>
            </div>

            {modalAbierto && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{modoEdicion ? "Editar visitante" : "Nuevo visitante"}</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Documento"
                                value={formData.documento}
                                onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Dependencia"
                                value={formData.dependencia}
                                onChange={(e) => setFormData({ ...formData, dependencia: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Funcionario"
                                value={formData.funcionario}
                                onChange={(e) => setFormData({ ...formData, funcionario: e.target.value })}
                            />
                            <input
                                type="date"
                                value={formData.fecha}
                                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                            />
                            <input
                                type="time"
                                value={formData.horaEntrada}
                                onChange={(e) => setFormData({ ...formData, horaEntrada: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Documento Vigilante"
                                value={formData.documentoVigilante}
                                onChange={(e) => setFormData({ ...formData, documentoVigilante: e.target.value })}
                            />
                            <div className="modal-buttons">
                                <button type="submit" className="btn-guardar">Guardar</button>
                                <button type="button" className="btn-cancelar" onClick={() => setModalAbierto(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}