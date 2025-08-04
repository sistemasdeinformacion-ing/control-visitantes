import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAdmin.css";
import logo from "../assets/logo.png";

const LoginAdmin = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === "admin" && contrasena === "admin123") {
      navigate("/admin-panel");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-admin-container">
      <img src={logo} alt="Logo" className="logo-login-admin" />
      <form className="formulario-login-admin" onSubmit={handleSubmit}>
        <h2 className="titulo-login-admin">NOMBRE DEL ADMINISTRADOR</h2>

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

        <button type="submit">INGRESAR</button>
      </form>
    </div>
  );
};

export default LoginAdmin;