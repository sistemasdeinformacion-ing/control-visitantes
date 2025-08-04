import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ControlVigilante.css";
import perfilAdministrador from "../assets/perfil-administrador.png";

import logo from "../assets/logo.png";
import fondoAgua from "../assets/fondo-agua.png";
import vigilanteHombre from "../assets/vigilante-hombre.png";
import vigilanteMujer from "../assets/vigilante-mujer.png";
import iconoAgregar from "../assets/icono-agregar.png";

const ControlVigilante = () => {
  const navigate = useNavigate();
  const [vigilantes, setVigilantes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVigilantes = async () => {
      try {
        const API_URL = "https://backend-fe7f.onrender.com";
        const res = await fetch(`${API_URL}/api/vigilantes`);

        if (!res.ok) {
          throw new Error("Error en la respuesta del servidor");
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setVigilantes(data);
        } else {
          setVigilantes([]);
          setError("La respuesta no es una lista válida.");
        }
      } catch (err) {
        console.error("Error al cargar vigilantes:", err);
        setError("No se pudo conectar al servidor.");
        setVigilantes([]);
      }
    };

    fetchVigilantes();
  }, []);

  const redirigirALogin = (vigilante) => {
    navigate(`/login-vigilante/${vigilante.documento}`, { state: { vigilante } });
  };

  return (
    <div className="control-container">
      <img src={fondoAgua} alt="fondo superior" className="fondo-superior" />
      <img src={logo} alt="logo" className="logo" />

      <div className="perfil-admin" onClick={() => navigate("/login-admin")}>
        <img src={perfilAdministrador} alt="Perfil Administrador" className="icono-admin" />
        <p className="texto-admin">ADMINISTRADOR</p>
      </div>

      <h1 className="titulo">VIGILANTE EN CONTROL</h1>

      <div className="botones">
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {vigilantes.map((v) => (
          <button key={v.documento} onClick={() => redirigirALogin(v)}>
            <img
              className="icono-persona"
              src={v.genero === "mujer" ? vigilanteMujer : vigilanteHombre}
              alt={`vigilante ${v.genero}`}
            />
            {v.nombre.toUpperCase()}
          </button>
        ))}

        <button onClick={() => navigate("/registrar-vigilante")}>
          <img className="icono-persona" src={iconoAgregar} alt="registrar" />
          REGISTRAR VIGILANTE
        </button>
      </div>

      <img src={fondoAgua} alt="fondo inferior" className="fondo-inferior" />
    </div>
  );
};

export default ControlVigilante;