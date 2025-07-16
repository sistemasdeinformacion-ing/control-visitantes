// src/components/RegistroEntrada.jsx
import React from "react";
import "./RegistroEntrada.css";
import logo from "../assets/logo.png"; // Ajusta el path si es diferente

const RegistroEntrada = () => {
  return (
    <div className="entrada-container">
      <div className="entrada-form">
        <img src={logo} alt="Logo" className="logo-form" />
        <h2><span className="titulo-negro">REGISTRO</span> <span className="titulo-azul">ENTRADA</span></h2>

        <form>
          <label>Documento de Identidad:</label>
          <input type="text" placeholder="Número de documento" />

          <label>Nombre:</label>
          <input type="text" placeholder="Nombre completo" />

          <label>Dependencia:</label>
          <input type="text" placeholder="Área o dependencia" />

          <label>Funcionario a visitar:</label>
          <input type="text" placeholder="Nombre del funcionario" />

          <button type="submit">REGISTRAR ENTRADA</button>
        </form>
      </div>
    </div>
  );
};

export default RegistroEntrada;
