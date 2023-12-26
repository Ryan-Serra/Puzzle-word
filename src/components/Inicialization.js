import './Inicialization.css';
import Game from './Game';
import React, { useState } from 'react';  // Import useState from React

const Inicialization = ({startGame}) => {
  const [gameStarted, setGameStarted] = useState(false);  // State to track whether the game has started

  

  // Render the Game component conditionally based on the gameStarted state
  return (
    <div>
      <h1 className='title_inicialization'>Secret Word</h1>
      <p className='paragrafo_inicialization'>Clique no botão para começar a jogar</p>

        <input className='input_i' type="button" value="Jogar" onClick={startGame}/>
    </div>
  );
}

export default Inicialization;
