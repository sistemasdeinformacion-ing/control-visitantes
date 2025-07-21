import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistroVigilante.css";
import logo from "../assets/logo.png";
import vigilanteHombre from "../assets/vigilante-hombre.png";
import vigilanteMujer from "../assets/vigilante-mujer.png";

const RegistroVigilante = () => {
    const [documento, setDocumento] = useState("");
    const [nombre, setNombre] = useState("");
    const [genero, setGenero] = useState(null); // 'hombre' o 'mujer'
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!documento || !nombre || !genero) {
            alert("Por favor complete todos los campos y seleccione un género");
            return;
        }

        const infoVigilante = {
            documento,
            nombre,
            genero
        };

        localStorage.setItem("vigilante", JSON.stringify(infoVigilante));

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

                    <label>Seleccione su ícono:</label>
                    <div className="iconos-genero">
                        <img
                            src={vigilanteHombre}
                            alt="Hombre"
                            className={`icono-genero ${genero === "hombre" ? "seleccionado" : ""}`}
                            onClick={() => setGenero("hombre")}
                        />
                        <img
                            src={vigilanteMujer}
                            alt="Mujer"
                            className={`icono-genero ${genero === "mujer" ? "seleccionado" : ""}`}
                            onClick={() => setGenero("mujer")}
                        />
                    </div>

                    <button className="submit" type="submit">REGISTRAR</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroVigilante;
