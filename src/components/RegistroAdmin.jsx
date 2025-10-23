import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAdmin.css"; 
import logo from "../assets/logo.png";

const RegistroAdmin = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backend-vb5s.onrender.com/admin/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });
      const data = await res.json();
      if (data.ok) {
        alert("Administrador registrado correctamente");
        navigate("/login-admin");
      } else {
        alert("Error al registrar");
      }
    } catch (err) {
      console.error(err);
      alert("Error al registrar");
    }
  };

  return (
    <div className="login-admin-container">
      <div className="logo-clickable" onClick={() => navigate("/control-vigilante")}>
        <img src={logo} alt="logo" className="logo-login-admin" />
      </div>
      <form className="formulario-login-admin" onSubmit={handleRegistro}>
        <h2 className="titulo-login-admin">REGISTRAR ADMINISTRADOR</h2>

        <label>Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />

        <button type="submit">REGISTRAR</button>
      </form>
    </div>
  );
};

export default RegistroAdmin;
