import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './Landing';
import NotesBoard from './NotesBoard';
import './App.css';

function App() {
  return (
    <Router>
      <header className="header">
        <h1>Sticky Notes – Dockerized Demo</h1>
        <p>React • Node.js • Postgres • Docker</p>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/notes">Tablero</Link>
          <a href="https://github.com/celiaricogz/tristack-demo" target="_blank" rel="noopener noreferrer">
            Código
          </a>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/notes" element={<NotesBoard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
