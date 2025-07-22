import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ControlVigilante.css";

import logo from "../assets/logo.png";
import fondoAgua from "../assets/fondo-agua.png";
import vigilanteHombre from "../assets/vigilante-hombre.png";
import vigilanteMujer from "../assets/vigilante-mujer.png";
import iconoAgregar from "../assets/icono-agregar.png";

const ControlVigilante = () => {
  const navigate = useNavigate();
  const [vigilantes, setVigilantes] = useState([]);

  useEffect(() => {
    const fetchVigilantes = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/vigilantes");
        const data = await res.json();
        setVigilantes(data);
      } catch (error) {
        console.error("Error al cargar vigilantes:", error);
      }
    };

    fetchVigilantes();
  }, []);

  const ingresarConVigilante = (vigilante) => {
    localStorage.setItem("vigilante", JSON.stringify(vigilante));
    navigate("/home");
  };

  return (
    <div className="control-container">
      <img src={fondoAgua} alt="fondo superior" className="fondo-superior" />
      <img src={logo} alt="logo" className="logo" />

      <h1 className="titulo">VIGILANTE EN CONTROL</h1>

      <div className="botones">
        {vigilantes.map((v) => (
          <button key={v.documento} onClick={() => ingresarConVigilante(v)}>
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