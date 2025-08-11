import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ← IMPORTANTE
import Logo from "../assets/logo.png";
import "./ModuloVisitantes.css";
import verIcon from "../assets/visualizar.png";
import editarIcon from "../assets/editar.png";
import eliminarIcon from "../assets/eliminar.png";
import adminIcon from "../assets/perfil-blanco.png";
import AdminFooter from "./AdminFooter";

export default function ModuloVisitantes() {
    const navigate = useNavigate(); // ← HOOK DE NAVEGACIÓN

    const [visitantes, setVisitantes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        documento: "",
        empresa: "",
        motivo: "",
    });

    useEffect(() => {
        cargarVisitantes();
    }, []);

    const cargarVisitantes = async () => {
        try {
            const data = await getVisitantes();
            setVisitantes(data);
        } catch (error) {
            console.error("Error al cargar visitantes:", error);
        }
    };

    const abrirModalNuevo = () => {
        setFormData({ nombre: "", documento: "", empresa: "", motivo: "" });
        setModoEdicion(false);
        setModalAbierto(true);
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
                await updateVisitante(formData.id, formData);
            } else {
                await createVisitante(formData);
            }
            setModalAbierto(false);
            cargarVisitantes();
        } catch (error) {
            console.error("Error al guardar visitante:", error);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este visitante?")) {
            try {
                await deleteVisitante(id);
                cargarVisitantes();
            } catch (error) {
                console.error("Error al eliminar visitante:", error);
            }
        }
    };

    const visitantesFiltrados = visitantes.filter(v =>
        v.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        v.documento.includes(busqueda)
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
                    <button
                        className="nav-btn"
                        onClick={() => navigate("/modulo-vigilantes")}
                    >
                        VIGILANTES
                    </button>
                    <button
                        className="nav-btn"
                        onClick={() => navigate("/modulo-reportes")}
                    >
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
                    <button className="btn-nuevo" onClick={abrirModalNuevo}>
                        + Nuevo visitante
                    </button>
                </div>

                <div className="tabla-visitantes">
                    {visitantesFiltrados.map((v) => (
                        <div className="fila" key={v.id}>
                            <div className="nombre">{v.nombre}</div>
                            <div className="acciones">
                                <img src={verIcon} alt="Ver" title="Ver" />
                                <img src={editarIcon} alt="Editar" title="Editar" onClick={() => abrirModalEditar(v)} />
                                <img src={eliminarIcon} alt="Eliminar" title="Eliminar" onClick={() => handleEliminar(v.id)} />
                            </div>
                        </div>
                    ))}
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
                                placeholder="Empresa"
                                value={formData.empresa}
                                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Motivo"
                                value={formData.motivo}
                                onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
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