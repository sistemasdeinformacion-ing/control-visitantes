import React, { useEffect, useState } from "react";
import "./ModuloVigilantes.css";
import logo from "../assets/logo.png";
import iconoAdmin from "../assets/perfil-blanco.png";
import iconoVer from "../assets/visualizar.png";
import iconoEditar from "../assets/editar.png";
import iconoEliminar from "../assets/eliminar.png";
import axios from "axios";
import Mensaje from "./Mensaje";

const API = import.meta.env.VITE_API_URL;

const ModuloVigilantes = () => {
  const [adminNombre, setAdminNombre] = useState("");
  const [vigilantes, setVigilantes] = useState([]);
  const [vigilanteSeleccionado, setVigilanteSeleccionado] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editVigilante, setEditVigilante] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [toDeleteDocumento, setToDeleteDocumento] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("adminNombre");
    setAdminNombre(nombreGuardado || "NOMBRE DEL ADMINISTRADOR");
    obtenerVigilantes();
  }, []);

  const obtenerVigilantes = async () => {
    try {
      const res = await axios.get(`${API}/api/vigilantes`);
      setVigilantes(res.data);
    } catch (err) {
      console.error("Error al obtener vigilantes:", err);
      setMensaje({ tipo: "error", texto: "Error al obtener vigilantes." });
      setTimeout(() => setMensaje({ tipo: "", texto: "" }), 5000);
    }
  };

  const verVigilante = (vigilante) => {
    setVigilanteSeleccionado(vigilante);
  };

  const cerrarModalVer = () => {
    setVigilanteSeleccionado(null);
  };

  const abrirEditar = (vigilante) => {
    setEditVigilante({ ...vigilante });
    setEditModalOpen(true);
  };

  const cerrarEditar = () => {
    setEditModalOpen(false);
    setEditVigilante(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditVigilante(prev => ({ ...prev, [name]: value }));
  };

  const submitEditar = async (e) => {
    e.preventDefault();
    try {
      const documento = editVigilante.documento;
      const res = await axios.put(`${API}/api/vigilantes/${documento}`, editVigilante);
      setVigilantes(prev => prev.map(v => v.documento === documento ? res.data.updatedVigilante || editVigilante : v));
      setMensaje({ tipo: "exito", texto: "Vigilante actualizado correctamente." });
      cerrarEditar();
    } catch (err) {
      console.error("Error al actualizar vigilante:", err);
      setMensaje({ tipo: "error", texto: "Error al actualizar vigilante." });
    } finally {
      setTimeout(() => setMensaje({ tipo: "", texto: "" }), 5000);
    }
  };

  const abrirConfirmEliminar = (documento) => {
    setToDeleteDocumento(documento);
    setConfirmDeleteOpen(true);
  };

  const cancelarEliminar = () => {
    setConfirmDeleteOpen(false);
    setToDeleteDocumento(null);
  };

  const confirmarEliminar = async () => {
    try {
      await axios.delete(`${API}/api/vigilantes/${toDeleteDocumento}`);
      setVigilantes(prev => prev.filter(v => v.documento !== toDeleteDocumento));
      setMensaje({ tipo: "exito", texto: "Vigilante eliminado correctamente." });
    } catch (err) {
      console.error("Error al eliminar vigilante:", err);
      setMensaje({ tipo: "error", texto: "Error al eliminar vigilante." });
    } finally {
      setTimeout(() => setMensaje({ tipo: "", texto: "" }), 5000);
      cancelarEliminar();
    }
  };

  return (
    <div className="modulo-container">
      <div className="modulo-sidebar">
        <img src={logo} alt="Logo" className="modulo-logo" />
        <div className="modulo-nav">
          <button className="nav-btn">VISITANTES</button>
          <button className="nav-btn">REPORTES</button>
        </div>
        <div className="modulo-user">
          <img src={iconoAdmin} alt="Admin" />
        </div>
      </div>

      <div className="modulo-content">
        <div className="modulo-header">
          <span className="admin-name">{adminNombre}</span>
          <span className="admin-label">ADMINISTRADOR</span>
        </div>

        <h2 className="modulo-title">VIGILANTES</h2>

        {mensaje.texto && <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} />}

        <div className="tabla-vigilantes">
          {vigilantes.map((v) => (
            <div className="fila" key={v.documento}>
              <span className="nombre">{v.nombre}</span>
              <div className="acciones">
                <img src={iconoVer} alt="Ver" title="Ver" onClick={() => verVigilante(v)} />
                <img src={iconoEditar} alt="Editar" title="Editar" onClick={() => abrirEditar(v)} />
                <img src={iconoEliminar} alt="Eliminar" title="Eliminar" onClick={() => abrirConfirmEliminar(v.documento)} />
              </div>
            </div>
          ))}

          {vigilantes.length === 0 && (
            <div className="vacio">No hay vigilantes registrados.</div>
          )}
        </div>
      </div>

      {vigilanteSeleccionado && (
        <div className="overlay">
          <div className="modal-contenido">
            <h3>Información del Vigilante</h3>
            <p><strong>Documento:</strong> {vigilanteSeleccionado.documento}</p>
            <p><strong>Nombre:</strong> {vigilanteSeleccionado.nombre}</p>
            <p><strong>Género:</strong> {vigilanteSeleccionado.genero}</p>
            <p><strong>Usuario:</strong> {vigilanteSeleccionado.usuario}</p>
            <div className="modal-actions">
              <button onClick={cerrarModalVer}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {editModalOpen && editVigilante && (
        <div className="overlay">
          <div className="modal-contenido">
            <h3>Editar Vigilante</h3>
            <form onSubmit={submitEditar} className="form-editar">
              <label>Documento (no editable)</label>
              <input type="text" value={editVigilante.documento} disabled />

              <label>Nombre</label>
              <input name="nombre" value={editVigilante.nombre} onChange={handleEditChange} />

              <label>Género</label>
              <input name="genero" value={editVigilante.genero || ""} onChange={handleEditChange} />

              <label>Usuario</label>
              <input name="usuario" value={editVigilante.usuario || ""} onChange={handleEditChange} />

              <label>Contraseña</label>
              <input name="contrasena" value={editVigilante.contrasena || ""} onChange={handleEditChange} />

              <div className="modal-actions">
                <button type="button" onClick={cerrarEditar}>Cancelar</button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDeleteOpen && (
        <div className="overlay">
          <div className="modal-contenido">
            <h3>Confirmar eliminación</h3>
            <p>¿Deseas eliminar el vigilante con documento <strong>{toDeleteDocumento}</strong>?</p>
            <div className="modal-actions">
              <button onClick={cancelarEliminar}>No</button>
              <button onClick={confirmarEliminar}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuloVigilantes;