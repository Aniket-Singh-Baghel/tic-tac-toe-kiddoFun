import React, { useEffect } from "react";
import winSound from '../assets/mixkit-video-game-win-2016.wav'
import drawSound from '../assets/mixkit-retro-arcade-lose-2027.wav'

const winAudio = new Audio(winSound);
const drawAudio = new Audio(drawSound);

function GameOver({ winner, onGameOver }) {

  useEffect(() => {
    if (winner) {
      winAudio.currentTime = 0;
      winAudio.play();
    } else {
      drawAudio.currentTime = 0;
      drawAudio.play();
    }
  }, [winner]);
  
  return (
    <div id="game-over-container">
      <div id="game-over">
        <h1>Game Over</h1>
        {winner && <p> "{winner}" won the game</p>}
        {!winner && <p> It's a draw </p>}
        <p>
          <button onClick={onGameOver}>Remach</button>
        </p>
      </div>
    </div>
  );
}

export default GameOver;
