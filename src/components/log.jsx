// Log.js

import React from "react";

function Log({ gameTurns, players }) {
  return (
    <ol id="log-container">
      {gameTurns.map((turn) => (
        <li key={`${turn.cell.row}${turn.cell.column}`}>
          {players[turn.playerIcon]} selected {(turn.cell.row +1)},{(turn.cell.column+1)}
        </li>
      ))}
    </ol>
  );
}

export default Log;

