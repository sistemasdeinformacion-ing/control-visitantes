import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginVigilante.css";

import logo from "../assets/logo.png";

const LoginVigilante = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { vigilante } = location.state || {};

    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (usuario === vigilante?.usuario && contrasena === vigilante?.contrasena) {
            localStorage.setItem("vigilante", JSON.stringify(vigilante));
            navigate("/home");
        } else {
            setError("Usuario o contraseña incorrectos.");
        }
    };

    return (
        <div className="login-container">
            <div className="logo-clickable" onClick={() => navigate("/control-vigilante")}>
                <img src={logo} alt="logo" className="logo" />
            </div>

            <div className="login-card">
                <h2>{vigilante ? vigilante.nombre.toUpperCase() : "CARGANDO..."}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Usuario:</label>
                    <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required />

                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />

                    {error && <p className="error">{error}</p>}

                    <button type="submit">INGRESAR</button>
                </form>
            </div>
        </div>
    );
};

export default LoginVigilante;