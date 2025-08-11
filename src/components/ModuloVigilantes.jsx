import React, { useEffect, useState } from "react";
import "./ModuloVigilantes.css";
import logo from "../assets/logo.png";
import iconoAdmin from "../assets/perfil-blanco.png";
import iconoVer from "../assets/visualizar.png";
import iconoEditar from "../assets/editar.png";
import iconoEliminar from "../assets/eliminar.png";
import axios from "axios";

const ModuloVigilantes = () => {
  const [adminNombre, setAdminNombre] = useState("");
  const [vigilantes, setVigilantes] = useState([]);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("adminNombre");
    setAdminNombre(nombreGuardado || "NOMBRE DEL ADMINISTRADOR");

    const obtenerVigilantes = async () => {
      try {
        const response = await axios.get(
          "https://backend-fe7f.onrender.com/api/vigilantes"
        );
        setVigilantes(response.data);
      } catch (error) {
        console.error("Error al obtener vigilantes:", error);
      }
    };

    obtenerVigilantes();
  }, []);

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

        <div className="tabla-vigilantes">
          {vigilantes.map((vigilante) => (
            <div className="fila" key={vigilante.documento}>
              <span className="nombre">{vigilante.nombre}</span>
              <div className="acciones">
                <img src={iconoVer} alt="Ver" />
                <img src={iconoEditar} alt="Editar" />
                <img src={iconoEliminar} alt="Eliminar" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuloVigilantes;

