import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistroEntrada.css";
import logo from "../assets/logo.png";
import Mensaje from "./Mensaje";

const API_URL = import.meta.env.VITE_API_URL;

const RegistroEntrada = () => {
    const [documento, setDocumento] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [dependencia, setDependencia] = useState("");
    const [funcionario, setFuncionario] = useState("");
    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
    const [mostrarModal, setMostrarModal] = useState(true);
    const [acepto, setAcepto] = useState(false);

    const vigilante = JSON.parse(localStorage.getItem("vigilante"));

    useEffect(() => {
        if (mensaje.texto) {
            const timer = setTimeout(() => {
                setMensaje({ texto: "", tipo: "" });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fecha = new Date();
        const fechaFormateada = fecha.toISOString().split("T")[0];
        const hora = fecha.toTimeString().split(" ")[0];

        const nuevoVisitante = {
            documento,
            nombre,
            telefono,
            dependencia,
            funcionario,
            fecha: fechaFormateada,
            horaEntrada: hora,
            documentoVigilante: vigilante?.documento || "No identificado",
        };

        try {
            const respuesta = await fetch(`${API_URL}/api/visitantes/entrada`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoVisitante),
            });

            if (!respuesta.ok) throw new Error("Error al registrar entrada");

            setMensaje({ texto: "Entrada registrada correctamente", tipo: "exito" });
            setDocumento("");
            setNombre("");
            setTelefono("");
            setDependencia("");
            setFuncionario("");
        } catch (error) {
            console.error("Error:", error);
            setMensaje({ texto: "Error al registrar la entrada", tipo: "error" });
        }
    };

    const buscarVisitante = async () => {
        if (!documento.trim()) {
            setMensaje({ texto: "Por favor ingresa un número de documento", tipo: "error" });
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/visitantes/buscar/${documento}`);
            if (response.ok) {
                const data = await response.json();
                setNombre(data.nombre);
                setTelefono(data.telefono || "");
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
    };

    return (
        <div className="entrada-container">
            {mostrarModal && (
                <div className="modal-overlay">
                    <div className="modal-content">

                        <button
                            className="modal-close"
                            onClick={() => navigate("/home")}
                        >
                            X
                        </button>

                        <h3 className="titulo-modal">Autorización tratamiento de datos personales</h3>
                        <p>
                            Autorizo de manera libre, previa, e informada a
                            <b> Empresas Públicas del Quindío</b> para recolectar mis datos personales
                            con la finalidad de controlar mi ingreso y salida de las instalaciones,
                            en cumplimiento de la Ley 1581 de 2012 y demás normas aplicables.
                        </p>
                        <div className="modal-check">
                            <input className="checkbox"
                                type="checkbox"
                                id="acepto"
                                checked={acepto}
                                onChange={() => setAcepto(!acepto)}
                            />
                            <label htmlFor="acepto">Acepto la autorización</label>
                        </div>
                        <button
                            className="modal-btn"
                            onClick={() => setMostrarModal(false)}
                            disabled={!acepto}
                        >
                            CONTINUAR
                        </button>
                    </div>
                </div>
            )}

            {!mostrarModal && (
                <div className="entrada-form">
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo-form"
                        onClick={() => navigate("/home")}
                        style={{ cursor: "pointer" }}
                    />

                    <h2>
                        <span className="titulo-negro">REGISTRO</span>{" "}
                        <span className="titulo-azul">ENTRADA</span>
                    </h2>

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

                        <button className="search" type="button" onClick={buscarVisitante}>
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

                        <label>Teléfono:</label>
                        <input
                            type="text"
                            placeholder="Número de teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />

                        <label>Dependencia:</label>
                        <select
                            value={dependencia}
                            onChange={(e) => setDependencia(e.target.value)}
                            required
                        >
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
            )}
        </div>
    );
};

export default RegistroEntrada;