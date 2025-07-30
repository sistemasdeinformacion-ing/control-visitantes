import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import logo from "../assets/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <img src={logo} alt="logo" className="landing-logo" />

      <h1 className="landing-titulo">
        <span>CONTROL</span> <span className="azul">DE VISITANTES</span>
      </h1>

      <p className="landing-subtitulo">
        EMPRESAS PUBLICAS DEL QUINDIO SA ESP
      </p>

      <button className="landing-boton" onClick={() => navigate("/control-vigilante")}>
        INGRESAR
      </button>
    </div>
  );
};

export default Landing;