import React, { useState } from "react";
import "./RegistroEntrada.css";
import logo from "../assets/logo.png";

const RegistroEntrada = () => {
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [dependencia, setDependencia] = useState("");
  const [funcionario, setFuncionario] = useState("");

  const handleSubmit = (e) => {
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
    };

    console.log("Visitante registrado:", nuevoVisitante);

    alert("Entrada registrada correctamente");
    
    setDocumento("");
    setNombre("");
    setDependencia("");
    setFuncionario("");
  };

  return (
    <div className="entrada-container">
      <div className="entrada-form">
        <img src={logo} alt="Logo" className="logo-form" />
        <h2><span className="titulo-negro">REGISTRO</span> <span className="titulo-azul">ENTRADA</span></h2>

        <form onSubmit={handleSubmit}>
          <label>Documento de Identidad:</label>
          <input
            type="text"
            placeholder="Número de documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />

            <button className="search" type="button">BUSCAR</button>


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