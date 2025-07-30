import React from "react";
import { useNavigate } from "react-router-dom";
import "./PantallaPrincipal.css";

import fondoPrincipal from "../assets/fondo-principal.png";
import logo from "../assets/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="pantalla-principal">
      <img src={logo} alt="Logo EQQ" className="logo-principal" />

      <div className="titulo-principal">
        <h1>
          <span className="control-texto">CONTROL</span> <span className="de-texto">DE</span>
        </h1>
        <h1 className="visitantes-texto">VISITANTES</h1>
        <p className="subtitulo">EMPRESAS PUBLICAS DEL QUINDIO SA ESP</p>
      </div>

      <button className="boton-ingresar" onClick={() => navigate("/vigilantes")}>
        INGRESAR
      </button>

      <img src={fondoPrincipal} alt="Fondo Curvo" className="fondo-principal" />
    </div>
  );
};

export default Landing;
