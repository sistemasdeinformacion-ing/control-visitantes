import React from "react";
import "./RegistroSalida.css";
import logo from "../assets/logo.png";

const RegistroSalida = () => {
    return (
        <div className="salida-container">
            <div className="salida-form">
                <img src={logo} alt="Logo" className="logo-form" />
                <h2><span className="titulo-negro">REGISTRO</span> <span className="titulo-azul">SALIDA</span></h2>

                <form>
                    <label>Documento de Identidad:</label>
                    <input type="text" placeholder="Número de documento" />

                    <button className="submit" type="submit">REGISTRAR SALIDA</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroSalida;
