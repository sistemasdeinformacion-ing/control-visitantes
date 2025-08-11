import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeAdministrador.css";

import logo from "../assets/logo.png";
import adminIcon from "../assets/perfil-blanco.png";

import boton1Bn from "../assets/boton-1.png";
import boton2Bn from "../assets/boton-2.png";
import boton3Bn from "../assets/boton-3.png";

import boton1Color from "../assets/vigilantes-color.png";
import boton2Color from "../assets/visitantes-color.png";
import boton3Color from "../assets/reportes-color.png";

import Mensaje from "./Mensaje";

const BotonConCambio = ({ imgBn, imgColor, alt, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      className="boton-admin"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={hover ? imgColor : imgBn} alt={alt} />
    </button>
  );
};

const HomeAdministrador = () => {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const menuRef = useRef(null);

  const nombreAdmin = localStorage.getItem("adminNombre") || "NOMBRE DEL ADMINISTRADOR";

  const handleLogout = () => {
    localStorage.removeItem("adminNombre");
    localStorage.removeItem("adminDocumento");
    navigate("/control-vigilante");
  };

  const handleEliminarPerfil = async () => {
    const documento = localStorage.getItem("adminDocumento");

    if (!documento) {
      setMensaje({ tipo: "error", texto: "No se pudo obtener el documento del administrador." });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/administradores/eliminar/${documento}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        setMensaje({ tipo: "error", texto: data.error || "Error al eliminar el perfil." });
        return;
      }

      localStorage.removeItem("adminNombre");
      localStorage.removeItem("adminDocumento");
      navigate("/login-admin");
    } catch (error) {
      console.error("Error al eliminar perfil:", error);
      setMensaje({ tipo: "error", texto: "Error al conectar con el servidor." });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="logo-clickable">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="admin-info">
          <span className="admin-name-btn">{nombreAdmin}</span>
          <span className="admin-label">ADMINISTRADOR</span>
        </div>
      </div>

      <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} />

      <div className="admin-botones">
        <BotonConCambio imgBn={boton1Bn} imgColor={boton1Color} alt="vigilantes" onClick={() => navigate("/modulo-vigilantes")} />
        <BotonConCambio imgBn={boton2Bn} imgColor={boton2Color} alt="visitantes" onClick={() => navigate("/modulo-visitantes")} />
        <BotonConCambio imgBn={boton3Bn} imgColor={boton3Color} alt="reportes" onClick={() => navigate("/modulo-reportes")} />
      </div>

      <div className="admin-footer">
        <div className="icono-inferior" onClick={() => setMenuAbierto(!menuAbierto)} ref={menuRef}>
          <img src={adminIcon} alt="admin" />
          {menuAbierto && (
            <div className="menu-desplegable">
              <button className="menu-desplegable-1" onClick={handleLogout}>Salir</button>
              <button className="menu-desplegable-2" onClick={handleEliminarPerfil}>Eliminar perfil</button>
            </div>
          )}
        </div>
        <div className="footer-azul"></div>
      </div>
    </div>
  );
};

export default HomeAdministrador;