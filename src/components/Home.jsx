import './Home.css';
import logo from '../assets/logo.png';
import fondoAgua from '../assets/fondo-agua.png';

function Home() {
  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <img src={fondoAgua} alt="Decoración superior" className="fondo-superior" />

      <h1 className="titulo">CONTROL DE VISITANTES</h1>

      <div className="botones">
        <button>REGISTRAR ENTRADA DE VISITANTE</button>
        <button>REGISTRAR SALIDA DE VISITANTE</button>
        <button>VISUALIZAR VISITANTES EN TIEMPO REAL</button>
        <button>GENERAR REPORTES DE VISITANTES</button>
      </div>

      <img src={fondoAgua} alt="Decoración inferior" className="fondo-inferior" />
    </div>
  );
}

export default Home;
