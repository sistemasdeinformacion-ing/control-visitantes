import React from "react";
import { useNavigate } from "react-router-dom";
import "./ControlVigilante.css";

import logo from "../assets/logo.png";
import fondoAgua from "../assets/fondo-agua.png";
import vigilanteHombre from "../assets/vigilante-hombre.png";
import vigilanteMujer from "../assets/vigilante-mujer.png";
import iconoAgregar from "../assets/icono-agregar.png";

const ControlVigilante = () => {
    const navigate = useNavigate();

    const ingresarConVigilante = (nombre) => {
        localStorage.setItem("vigilante", nombre);
        navigate("/");
    };

    return (
        <div className="control-container">
            <img src={fondoAgua} alt="fondo superior" className="fondo-superior" />
            <img src={logo} alt="logo" className="logo" />

            <h1 className="titulo">VIGILANTE EN CONTROL</h1>

            <div className="botones">
                <button onClick={() => ingresarConVigilante("Carlos Ruiz")}>
                    <img className="icono-persona" src={vigilanteHombre} alt="vigilante hombre" />
                    NOMBRE DEL VIGILANTE
                </button>

                <button onClick={() => ingresarConVigilante("María Gómez")}>
                    <img className="icono-persona" src={vigilanteMujer} alt="vigilante mujer" />
                    NOMBRE DEL VIGILANTE
                </button>

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
