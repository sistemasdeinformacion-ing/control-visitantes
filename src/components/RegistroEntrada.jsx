import React, { useState, useEffect } from "react";
import "./RegistroEntrada.css";
import logo from "../assets/logo.png";
import Mensaje from "./Mensaje";

const RegistroEntrada = () => {
    const [documento, setDocumento] = useState("");
    const [nombre, setNombre] = useState("");
    const [dependencia, setDependencia] = useState("");
    const [funcionario, setFuncionario] = useState("");
    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
    const vigilante = JSON.parse(localStorage.getItem("vigilante"));

    useEffect(() => {
        if (mensaje.texto) {
            const timer = setTimeout(() => {
                setMensaje({ texto: "", tipo: "" });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fecha = new Date();
        const fechaFormateada = fecha.toISOString().split("T")[0];
        const hora = fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const nuevoVisitante = {
            documento,
            nombre,
            dependencia,
            funcionario,
            fecha: fechaFormateada,
            horaEntrada: hora,
            documentoVigilante: vigilante?.documento || "No identificado",
        };

        try {
            const respuesta = await fetch("http://localhost:3001/api/visitantes/entrada", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoVisitante),
            });

            if (!respuesta.ok) throw new Error("Error al registrar entrada");

            setMensaje({ texto: "Entrada registrada correctamente", tipo: "exito" });
            setDocumento("");
            setNombre("");
            setDependencia("");
            setFuncionario("");
        } catch (error) {
            console.error("Error:", error);
            setMensaje({ texto: "Error al registrar la entrada", tipo: "error" });
        }
    };

    return (
        <div className="entrada-container">
            <div className="entrada-form">
                <img src={logo} alt="Logo" className="logo-form" />
                <h2><span className="titulo-negro">REGISTRO</span> <span className="titulo-azul">ENTRADA</span></h2>

                {mensaje.texto && <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} />}

                <form onSubmit={handleSubmit}>
                    <label>Documento de Identidad:</label>
                    <input
                        type="text"
                        placeholder="Número de documento"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />

                    <button
                        className="search"
                        type="button"
                        onClick={async () => {
                            if (!documento.trim()) {
                                setMensaje({ texto: "Por favor ingresa un número de documento", tipo: "error" });
                                return;
                            }

                            try {
                                const response = await fetch(`http://localhost:3001/api/visitantes/buscar/${documento}`);
                                if (response.ok) {
                                    const data = await response.json();
                                    setNombre(data.nombre);
                                    setDependencia(data.dependencia);
                                    setFuncionario(data.funcionario);
                                } else if (response.status === 404) {
                                    setMensaje({ texto: "Visitante no encontrado", tipo: "error" });
                                } else {
                                    throw new Error("Error al buscar visitante");
                                }
                            } catch (error) {
                                console.error("Error:", error);
                                setMensaje({ texto: "Error al buscar el visitante", tipo: "error" });
                            }
                        }}
                    >
                        BUSCAR
                    </button>

                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />

                    <label>Dependencia:</label>
                    <select value={dependencia} onChange={(e) => setDependencia(e.target.value)} required>
                        <option value="" disabled>Seleccionar</option>
                        <option value="SUBGERENCIA ADMINISTRATIVA Y FINANCIERA">SUBGERENCIA ADMINISTRATIVA Y FINANCIERA</option>
                        <option value="SECRETARÍA GENERAL">SECRETARÍA GENERAL</option>
                        <option value="SUBGERENCIA DE PLANEACION Y MEJORAMIENTO INSTITUCIONAL">SUBGERENCIA DE PLANEACION Y MEJORAMIENTO INSTITUCIONAL</option>
                        <option value="SUBGERENCIA DE SERVICIOS PUBLICOS">SUBGERENCIA DE SERVICIOS PUBLICOS</option>
                        <option value="TALENTO HUMANO">TALENTO HUMANO</option>
                        <option value="SUBGERENCIA DE COMERCIALIZACIÓN DE SERVICIOS Y ATENCIÓN AL CLIENTE">SUBGERENCIA DE COMERCIALIZACIÓN DE SERVICIOS Y ATENCIÓN AL CLIENTE</option>
                        <option value="CONTROL INTERNO DE GESTIÓN">CONTROL INTERNO DE GESTIÓN</option>
                        <option value="CONTROL INTERNO DISCIPLINARIO">CONTROL INTERNO DISCIPLINARIO</option>
                        <option value="TESORERIA">TESORERIA</option>
                    </select>

                    <label>Funcionario a Visitar:</label>
                    <input
                        type="text"
                        placeholder="Nombre del funcionario"
                        value={funcionario}
                        onChange={(e) => setFuncionario(e.target.value)}
                        required
                    />

                    <button className="submit" type="submit">REGISTRAR ENTRADA</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroEntrada;