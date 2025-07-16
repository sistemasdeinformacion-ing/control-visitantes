import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import fondoAgua from '../assets/fondo-agua.png';
import logo from "../assets/logo.png";

const Home = () => {
    const navigate = useNavigate();

    const irARegistroEntrada = () => {
        navigate("/registro-entrada");
    };

    const irARegistroSalida = () => {
        navigate("/registro-salida");
    };

    const irATiempoReal = () => {
        navigate("/tiempo-real");
    };

    const irAReporte = () => {
        navigate("/reporte");
    };

    return (
        <div className="container">
            <div className="header">
                <img src={logo} alt="Logo" className="logo" />
                <img src={fondoAgua} alt="Decoración superior" className="fondo-superior" />
            </div>

            <h1 className="titulo">CONTROL DE VISITANTES</h1>

            <div className="botones">
                <button onClick={irARegistroEntrada}>REGISTRAR ENTRADA DE VISITANTE</button>
                <button onClick={irARegistroSalida}>REGISTRAR SALIDA DE VISITANTE</button>
                <button onClick={irATiempoReal}>VISUALIZAR VISITANTES EN TIEMPO REAL</button>
                <button onClick={irAReporte}>GENERAR REPORTES DE VISITANTES</button>
            </div>

            <img src={fondoAgua} alt="Decoracion Inferior" className="fondo_inferior" />
        </div>
    );
};

export default Home;
