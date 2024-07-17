//App.js

import "./index.css";
import asset01 from './assets/asset01.png'
import asset03 from './assets/asset03.png'
import clickSound from './assets/mixkit-modern-technology-select-3124.wav'
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/log";
import { winning } from "./winning.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: "Player 1",
  0: "Player 2",
};

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play()
}

const clickAudio = new Audio(clickSound);

let INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].playerIcon === "X") {
    currentPlayer = "0";
  }
  return currentPlayer;
}

function derivedWinner(gameBoard, players) {
  let winner;
  for (const combination of winning) {
    const firstCellIcon = gameBoard[combination[0].row][combination[0].column];
    const secondCellIcon = gameBoard[combination[1].row][combination[1].column];
    const thirdCellIcon = gameBoard[combination[2].row][combination[2].column];

    if (
      firstCellIcon !== null &&
      firstCellIcon === secondCellIcon &&
      firstCellIcon === thirdCellIcon
    ) {
      winner = players[firstCellIcon];
    }
  }
  return winner;
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { cell, playerIcon } = turn;
    const { row, column } = cell;

    gameBoard[row][column] = playerIcon;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns)
  const winner = derivedWinner(gameBoard,players)
  let hasDraw = gameTurns.length == 9 && !winner;


  function onSelectPlayer(rowIndex, colIndex) {
    playAudio(clickAudio)
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedGameTurns = [
        {
          cell: { row: rowIndex, column: colIndex },
          playerIcon: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedGameTurns;
    });
  }

  function handleGameOver() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(icon, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [icon]: newName,
      };
    });
  }

  return (
    <>
       <div id="main-container">
      <img src={asset01} className="side-image left-image" alt="tall alien" />
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            icon="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS["0"]}
            icon="0"
            isActive={activePlayer === "0"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onGameOver={handleGameOver} />
        )}
        <GameBoard onSelectPlayer={onSelectPlayer} board={gameBoard} />
      </div>
      <img src={asset03} className="side-image right-image" alt="long headed alien" />
      <Log gameTurns={gameTurns} players={players}/>
    </div>
    </>
  );
}

export default App;
