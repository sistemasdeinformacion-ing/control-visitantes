import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAdmin.css";
import logo from "../assets/logo.png";

const API = import.meta.env.VITE_API_URL;

const LoginAdmin = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [existeAdmin, setExisteAdmin] = useState(null);
  const [nuevoAdmin, setNuevoAdmin] = useState({
    documento: "",
    nombre: "",
    usuario: "",
    contrasena: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/administradores`)
      .then(res => res.json())
      .then(data => {
        setExisteAdmin(data.length > 0);
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/administradores/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contrasena }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate("/admin-panel");
    } else {
      alert(data.error || "Error de inicio de sesión");
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/administradores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoAdmin),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Administrador registrado");
      setExisteAdmin(true);
    } else {
      alert(data.error || "Error al registrar");
    }
  };

  return (
    <div className="login-admin-container">
      <div className="logo-clickable" onClick={() => navigate("/control-vigilante")}>
        <img src={logo} alt="logo" className="logo-login-admin" />
      </div>

      {existeAdmin === null ? (
        <p>Cargando...</p>
      ) : existeAdmin ? (
        <form className="formulario-login-admin" onSubmit={handleLogin}>
          <h2 className="titulo-login-admin">INICIAR SESIÓN</h2>

          <label>Usuario:</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />

          <label>Contraseña:</label>
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />

          <button type="submit">INGRESAR</button>
        </form>
      ) : (
        <form className="formulario-login-admin" onSubmit={handleRegistro}>
          <h2 className="titulo-login-admin">REGISTRAR ADMINISTRADOR</h2>

          <label>Documento:</label>
          <input type="text" value={nuevoAdmin.documento} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, documento: e.target.value })} />

          <label>Nombre:</label>
          <input type="text" value={nuevoAdmin.nombre} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, nombre: e.target.value })} />

          <label>Usuario:</label>
          <input type="text" value={nuevoAdmin.usuario} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, usuario: e.target.value })} />

          <label>Contraseña:</label>
          <input type="password" value={nuevoAdmin.contrasena} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, contrasena: e.target.value })} />

          <button type="submit">REGISTRAR</button>
        </form>
      )}
    </div>
  );
};

export default LoginAdmin;