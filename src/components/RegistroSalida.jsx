// src/components/RegistroSalida.jsx
import React, { useState } from "react";
import "./RegistroSalida.css";
import logo from "../assets/logo.png";

const RegistroSalida = () => {
  const [documento, setDocumento] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!documento.trim()) {
    alert("Por favor ingresa el documento de identidad");
    return;
  }

  const now = new Date();
  const fechaSalida = now.toISOString().split("T")[0];
  const horaSalida = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const registroSalida = {
    documento,
    fechaSalida,
    horaSalida,
  };

  try {
    const respuesta = await fetch("http://localhost:3001/api/visitantes/salida", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registroSalida),
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.error || "Error al registrar salida");
    }

    alert("Salida registrada correctamente");
    setDocumento("");
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
};
    
  return (
    <div className="salida-container">
      <div className="salida-form">
        <img src={logo} alt="Logo" className="logo-form" />
        <h2>
          <span className="titulo-negro">REGISTRO</span>{" "}
          <span className="titulo-azul">SALIDA</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <label>Documento de Identidad:</label>
          <input
            type="text"
            placeholder="Número de documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />

          <button className="submit" type="submit">
            REGISTRAR SALIDA
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroSalida;
