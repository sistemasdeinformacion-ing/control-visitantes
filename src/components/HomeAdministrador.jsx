import React, { useState } from "react";
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

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="logo-clickable" onClick={() => navigate("/control-vigilante")}>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="admin-info">
          <span className="admin-name-btn">NOMBRE DEL ADMINISTRADOR</span>
          <span className="admin-label">ADMINISTRADOR</span>
        </div>
      </div>

      <div className="admin-botones">
        <BotonConCambio
          imgBn={boton1Bn}
          imgColor={boton1Color}
          alt="vigilantes"
          onClick={() => navigate("/modulo-vigilantes")}
        />
        <BotonConCambio
          imgBn={boton2Bn}
          imgColor={boton2Color}
          alt="visitantes"
          onClick={() => navigate("/modulo-visitantes")}
        />
        <BotonConCambio
          imgBn={boton3Bn}
          imgColor={boton3Color}
          alt="reportes"
          onClick={() => navigate("/modulo-reportes")}
        />
      </div>

      <div className="admin-footer">
        <div className="icono-inferior" onClick={() => navigate("/login-admin")}>
          <img src={adminIcon} alt="admin" />
        </div>
        <div className="footer-azul"></div>
      </div>
    </div>
  );
};

export default HomeAdministrador;