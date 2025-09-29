import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.png";
import "./ModuloVisitantes.css";
import verIcon from "../assets/visualizar.png";
import editarIcon from "../assets/editar.png";
import AdminFooter from "./AdminFooter";

const API = import.meta.env.VITE_API_URL;

export default function ModuloVisitantes() {
  const navigate = useNavigate();

  const [visitantes, setVisitantes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalVer, setModalVer] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    dependencia: "",
    funcionario: "",
    fecha: "",
    horaEntrada: "",
    horaSalida: "",
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

  const abrirModalVer = (visitante) => setModalVer(visitante);

  const abrirModalEditar = (visitante) => {
    const fechaFormateada = visitante.fecha
      ? new Date(visitante.fecha).toLocaleDateString("es-ES")
      : "";
    setFormData({
      ...visitante,
      fecha: fechaFormateada
    });
    setModoEdicion(true);
    setModalAbierto(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!modoEdicion) {
        await registrarEntrada(formData);
      } else {
        await axios.put(`${API}/api/visitantes/${formData.id}`, formData);
      }
      cerrarModales();
      cargarVisitantes();
    } catch (error) {
      console.error("Error al guardar visitante:", error);
    }
  };

  const cerrarModales = () => {
    setModalAbierto(false);
    setModalVer(null);
    setModoEdicion(false);
    setFormData({
      nombre: "",
      documento: "",
      dependencia: "",
      funcionario: "",
      fecha: "",
      horaEntrada: "",
      horaSalida: "",
      documentoVigilante: ""
    });
  };

  const visitantesFiltrados = visitantes.filter(v =>
    v.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.documento?.includes(busqueda)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const visitantesPaginados = visitantesFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(visitantesFiltrados.length / itemsPerPage);

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
            onChange={(e) => {
              setBusqueda(e.target.value);
              setCurrentPage(1); 
            }}
          />
        </div>

        <div className="tabla-visitantes">
          {visitantesPaginados.map((v) => (
            <div className="fila" key={v.id}>
              <div className="nombre">{v.nombre}</div>
              <div className="acciones">
                <img src={verIcon} alt="Ver" title="Ver" onClick={() => abrirModalVer(v)} />
                <img src={editarIcon} alt="Editar" title="Editar" onClick={() => abrirModalEditar(v)} />
              </div>
            </div>
          ))}

          {visitantesFiltrados.length === 0 && (
            <div className="vacio">No se encontraron visitantes.</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="paginacion">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              «
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "activo" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              »
            </button>
          </div>
        )}
      </div>

      {modalVer && (
        <div className="modal">
          <div className="modal-content">
            <h3>Detalle del visitante</h3>
            <p><strong>Nombre:</strong> {modalVer.nombre}</p>
            <p><strong>Documento:</strong> {modalVer.documento}</p>
            <p><strong>Dependencia:</strong> {modalVer.dependencia}</p>
            <p><strong>Funcionario:</strong> {modalVer.funcionario}</p>
            <p><strong>Fecha:</strong> {modalVer.fecha ? new Date(modalVer.fecha).toLocaleDateString("es-ES") : ""}</p>
            <p><strong>Hora Entrada:</strong> {modalVer.horaEntrada}</p>
            <p><strong>Hora Salida:</strong> {modalVer.horaSalida || "Aún dentro"}</p>
            <button className="btn-cancelar" onClick={cerrarModales}>Cerrar</button>
          </div>
        </div>
      )}

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
              <div className="modal-buttons">
                <button type="submit" className="btn-guardar">Guardar</button>
                <button type="button" className="btn-cancelar" onClick={cerrarModales}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}