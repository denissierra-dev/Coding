import { useState } from "react";
import { carts as initialCarts } from '../utils/carts';

function Bingo() {
  const [disponibles, setDisponibles] = useState(initialCarts);
  const [jugadas, setJugadas] = useState([]);
  const [ultima, setUltima] = useState(null);

  const sacarCarta = () => {
    if (disponibles.length === 0) return;

    const index = Math.floor(Math.random() * disponibles.length);
    const carta = disponibles[index];

    setDisponibles(prev =>
      prev.filter(c => c.id !== carta.id)
    );

    setJugadas(prev =>
      prev.some(c => c.id === carta.id)
        ? prev
        : [...prev, carta]
    );

    setUltima(carta);
  }

  const reset = () => {
    setDisponibles(initialCarts);
    setJugadas([]);
    setUltima(null);
  };

  return (
    <div className="bingo-container">
      <div className="bingo-wrapper">
        {/* Header */}
        <div className="bingo-header">
          <h1 className="bingo-title">
          🎲  Bingo 🎲
          </h1>
          <p className="bingo-counter">Cartas disponibles: <span>{disponibles.length}</span> / {initialCarts.length}</p>
        </div>

        {/* Controls */}
        <div className="bingo-controls">
          <button
            onClick={sacarCarta}
            disabled={disponibles.length === 0}
            className="btn btn-primary"
          >
            Sacar Carta 
          </button>
          
          <button
            onClick={reset}
            className="btn btn-secondary"
          >
             Reiniciar
          </button>
        </div>

        {/* Última carta destacada */}
        {ultima && (
          <div className="ultima-carta-container animate-fade-in">
            <div className="ultima-carta-wrapper">
              <div className="ultima-carta-content">
                <p className="ultima-carta-label">ÚLTIMA CARTA</p>
                <h2 className="ultima-carta-nombre">
                  {ultima.nombre}
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Cartas jugadas */}
        <div className="cartas-jugadas-container">
          <h3 className="cartas-jugadas-title">
            Cartas Jugadas ({jugadas.length})
          </h3>
          
          {jugadas.length === 0 ? (
            <p className="cartas-jugadas-empty">No hay cartas jugadas aún. ¡Saca tu primera carta!</p>
          ) : (
            <div className="cartas-grid">
              {jugadas.map((carta, index) => (
                <div
                  key={carta.id}
                  className="carta-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <p className="carta-item-text">{carta.nombre}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default Bingo;
