import './Penguin.css';

const Penguin = ({ currentPlayerId, player1Id, player2Id, selectedCard1, selectedCard2 }) => {

  return (
    <div className="penguin-container">
      {/* Jugador 1 */}
      <div
        className={`penguin-frame ${
          currentPlayerId === player1Id ? 'current-player' : 'opponent'
        }`}
      >
        <div className="penguin-emoji">🐧</div>
      </div>

      {/* Carta seleccionada del jugador 1 */}
      <div className={`card-frame ${selectedCard1 ? 'with-card' : 'empty'}`}>
        {selectedCard1 ? (
          <div className="card-content">{selectedCard1}</div>
        ) : (
          <div className="card-placeholder">Selecciona una carta</div>
        )}
      </div>

      {/* Carta seleccionada del jugador 2 */}
      <div className={`card-frame ${selectedCard2 ? 'with-card' : 'empty'}`}>
        {selectedCard2 ? (
          <div className="card-content">{selectedCard2}</div>
        ) : (
          <div className="card-placeholder">Selecciona una carta</div>
        )}
      </div>

      {/* Jugador 2 */}
      <div
        className={`penguin-frame ${
          currentPlayerId === player2Id ? 'current-player' : 'opponent'
        }`}
      >
        <div className="penguin-emoji">🐧</div>
      </div>
    </div>
  );
};

export default Penguin;
