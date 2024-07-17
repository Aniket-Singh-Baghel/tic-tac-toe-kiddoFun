// GameBoard.js

function GameBoard({ onSelectPlayer, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerIcon, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectPlayer(rowIndex, colIndex)}
                  disabled={playerIcon !== null}
                >
                  {playerIcon}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
