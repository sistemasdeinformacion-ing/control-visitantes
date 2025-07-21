import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import fondoAgua from '../assets/fondo-agua.png';
import logo from "../assets/logo.png";
import vigilanteHombre from "../assets/vigilante-hombre.png";
import vigilanteMujer from "../assets/vigilante-mujer.png";

const Home = () => {
    const navigate = useNavigate();
    const [vigilante, setVigilante] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("vigilante");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setVigilante(parsed);
            } catch {
                // En caso de que sea solo texto antiguo
                setVigilante({ nombre: stored, genero: null });
            }
        }
    }, []);

    const irARegistroEntrada = () => navigate("/registro-entrada");
    const irARegistroSalida = () => navigate("/registro-salida");
    const irATiempoReal = () => navigate("/tiempo-real");
    const irAReportes = () => navigate("/reportes");

    const icono = vigilante?.genero === "mujer" ? vigilanteMujer : vigilanteHombre;

    return (
        <div className="container">
            <div className="header">
                <img src={logo} alt="Logo" className="logo" />
                <img src={fondoAgua} alt="Decoración superior" className="fondo-superior" />

                {vigilante && (
                    <div className="vigilante-activo">
                        <img src={icono} alt="icono vigilante" className="icono-vigilante" />
                        <span className="nombre-vigilante">{vigilante.nombre}</span>
                    </div>
                )}
            </div>

            <h1 className="titulo">CONTROL DE VISITANTES</h1>

            <div className="botones">
                <button onClick={irARegistroEntrada}>REGISTRAR ENTRADA DE VISITANTE</button>
                <button onClick={irARegistroSalida}>REGISTRAR SALIDA DE VISITANTE</button>
                <button onClick={irATiempoReal}>VISUALIZAR VISITANTES EN TIEMPO REAL</button>
                <button onClick={irAReportes}>GENERAR REPORTES DE VISITANTES</button>
            </div>

            <img src={fondoAgua} alt="Decoracion inferior" className="fondo-inferior" />
        </div>
    );
};

export default Home;
