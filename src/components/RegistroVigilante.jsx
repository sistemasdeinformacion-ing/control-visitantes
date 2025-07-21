import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistroEntrada.css";
import logo from "../assets/logo.png";

const RegistroVigilante = () => {
    const [documento, setDocumento] = useState("");
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!documento || !nombre) {
            alert("Por favor complete todos los campos");
            return;
        }

        localStorage.setItem("vigilante", nombre);

        navigate("/home");
    };

    return (
        <div className="entrada-container">
            <div className="entrada-form">
                <img src={logo} alt="Logo" className="logo-form" />
                <h2><span className="titulo-negro">REGISTRO</span> <span className="titulo-azul">VIGILANTE</span></h2>

                <form onSubmit={handleSubmit}>
                    <label>Documento de Identidad:</label>
                    <input
                        type="text"
                        placeholder="Número de documento"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                    />

                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <button className="submit" type="submit">REGISTRAR</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroVigilante;
