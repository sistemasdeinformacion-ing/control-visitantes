import React, { useState, useRef, useEffect } from "react";
import adminIcon from "../assets/perfil-blanco.png";
import "./AdminFooter.css";

export default function AdminFooter() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const salir = () => {
    localStorage.clear();
    window.location.href = "/control-vigilante";
  };

  const eliminarPerfil = () => {
    const documento = localStorage.getItem("adminDocumento");
    fetch(`https://backend-vb5s.onrender.com/api/eliminar-admin/${documento}`, {
      method: "DELETE",
    })
      .then(() => salir())
      .catch((err) => console.error("Error eliminando perfil:", err));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !iconRef.current.contains(event.target)
      ) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer className="admin-footer-2">
      <div
        className="icono-inferior-2"
        ref={iconRef}
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        <img src={adminIcon} alt="admin" />
      </div>

      {menuAbierto && (
        <div className="menu-desplegable-3" ref={menuRef}>
          <button className="menu-desplegable-1" onClick={salir}>
            Salir
          </button>
          <button className="menu-desplegable-2" onClick={eliminarPerfil}>
            Eliminar perfil
          </button>
        </div>
      )}

      <div className="footer-azul"></div>
    </footer>
  );
}