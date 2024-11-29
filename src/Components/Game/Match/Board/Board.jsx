import './Board.css';

export default function Board({ board, matchInfo }) {
  const organizeBoardInZigzag = (board, numColumns) => {
    const rows = [];
    for (let i = 0; i < board.length; i += numColumns) {
      const row = board.slice(i, i + numColumns);
      if (Math.floor(i / numColumns) % 2 === 1) {
        row.reverse(); 
      }
      rows.push(row);
    }
    return rows;
  };

  const zigzagBoard = organizeBoardInZigzag(board, 5);

  return (
    <div className="board">
      {zigzagBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((position) => (
            <div
              key={position.id}
              className={`cell ${position.type} 
                ${position.id === matchInfo.player.boardPosition ? 'penguin' : ''} 
                ${position.id === matchInfo.opponent.boardPosition ? 'second-penguin' : ''}`}
            >
              <p>ID: {position.id}</p>
              <p>Type: {position.type}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

