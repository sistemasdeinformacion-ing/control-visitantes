import React from "react";
import "./Mensaje.css";

const Mensaje = ({ tipo, texto }) => {
  if (!texto) return null;

  return (
    <div className={`mensaje ${tipo}`}>
      {texto}
    </div>
  );
};

export default Mensaje;
