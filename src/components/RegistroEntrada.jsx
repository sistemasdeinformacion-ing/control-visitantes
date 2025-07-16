import React from "react";
import "./RegistroEntrada.css";
import logo from "../assets/logo.png"; 

const RegistroEntrada = () => {
    return (
        <div className="entrada-container">
            <div className="entrada-form">
                <img src={logo} alt="Logo" className="logo-form" />
                <h2><span className="titulo-negro">REGISTRO</span> <span className="titulo-azul">ENTRADA</span></h2>

                <form>
                    <label>Documento de Identidad:</label>
                    <input type="text" placeholder="Número de documento" />
                    <button className="search" type="submit">RUSCAR VISITANTE</button>

                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre completo" />

                    <label>Dependencia:</label>
                    <select defaultValue="">
                        <option value="" disabled>Seleccionar</option>
                        <option value="Administrativa">SUBGERENCIA ADMINISTRATIVA Y FINANCIERA</option>
                        <option value="Secretaria">SECRETARÍA GENERAL</option>
                        <option value="Planeacion">SUBGERENCIA DE PLANEACION Y MEJORAMIENTO INSTITUCIONAL</option>
                        <option value="Servicios">SUBGERENCIA DE SERVICIOS PUBLICOS</option>
                        <option value="Talento Humano">TALENTO HUMANO</option>
                        <option value="Comercio">SUBGERENCIA DE COMERCIALIZACIÓN DE SERVICIOS Y ATENCIÓN AL CLIENTE</option>
                        <option value="Gestion">CONTROL INTERNO DE GESTIÓN</option>
                        <option value="Discplina">CONTROL INTERNO DISCIPLINARIO</option>
                        <option value="Tesoreria">TESORERIA</option>
                    </select>

                    <label>Funcionario a Visitar:</label>
                    <input type="text" placeholder="Nombre del funcionario" />

                    <button className="submit" type="submit">REGISTRAR ENTRADA</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroEntrada;
