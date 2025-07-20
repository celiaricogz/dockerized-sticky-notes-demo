import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <h2>Bienvenido a Sticky Notes</h2>
      <p>
        Esta es una app de notas simple desarrollada con React, Node.js y Postgres,
        completamente dockerizada para mostrar habilidades DevOps y despliegue en contenedores.
      </p>
      <p>
        La app se ejecuta con <strong>Docker Compose</strong> e incluye
        backend, base de datos y frontend en contenedores separados.
      </p>
      <Link to="/notes" className="start-btn">
        Ir al tablero →
      </Link>
    </div>
  );
}

export default Landing;
