import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import fondoAgua from "../assets/fondo-agua.png";
import logo from "../assets/logo.png";
import vigilanteHombre from "../assets/vigilante-hombre.png";
import vigilanteMujer from "../assets/vigilante-mujer.png";
import menuHamburguesa from "../assets/menu.png";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const navigate = useNavigate();
    const [vigilante, setVigilante] = useState(null);
    const [menuAbierto, setMenuAbierto] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("vigilante");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setVigilante(parsed);
            } catch {
                setVigilante({ nombre: stored, genero: null });
            }
        }
    }, []);

    const irARegistroEntrada = () => navigate("/registro-entrada");
    const irARegistroSalida = () => navigate("/registro-salida");
    const irATiempoReal = () => navigate("/tiempo-real");
    const irAReportes = () => navigate("/reportes");

    const cerrarSesion = () => {
        localStorage.removeItem("vigilante");
        navigate("/");
    };

    const eliminarPerfil = async () => {
        try {
            await fetch(`${API_URL}/api/vigilantes/${vigilante.documento}`, {
                method: "DELETE",
            });
            localStorage.removeItem("vigilante");
            navigate("/");
        } catch (error) {
            console.error("Error al eliminar el perfil:", error);
        }
    };

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

                        <button
                            className="boton-cerrar-turno"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        >
                            <img src={menuHamburguesa} alt="menu" />
                        </button>

                        {menuAbierto && (
                            <div className="menu-flotante-home">
                                <button onClick={cerrarSesion}>Salir del perfil</button>
                                <button onClick={eliminarPerfil}>Eliminar perfil</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <h1 className="titulo">CONTROL DE VISITANTES</h1>

            <div className="botones">
                <button onClick={irARegistroEntrada}>REGISTRAR ENTRADA DE VISITANTE</button>
                <button onClick={irARegistroSalida}>REGISTRAR SALIDA DEL VISITANTE</button>
                <button onClick={irATiempoReal}>VISUALIZAR VISITANTES EN TIEMPO REAL</button>
                <button onClick={irAReportes}>GENERAR REPORTES DE VISITANTES</button>
            </div>

            <img src={fondoAgua} alt="Decoracion inferior" className="fondo-inferior" />
        </div>
    );
};

export default Home;