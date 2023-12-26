import { useState, useRef } from "react"

import "./Game.css"
import "./Inicialization.css"
const Game = ({
  verifyLetter, 
  pickedWord,
  pickedCategory,
  letters, 
  guessedLetters,
  wrongLetters,  // Corrigido aqui
  guesses, 
  score,
}) => {
  

  const[letter,setLetter]= useState("");
  const letterInputRef= useRef(null)
  const handleSubmit = (e)=> {
     e.preventDefault ();
     verifyLetter(letter);
      setLetter('');
      letterInputRef.current.focus() 
    }
  return (
    <div>
      <div className="game">
        <p className="points">
           <span>Pontuação:{score}</span>
        </p>
        <h1>Adivinhe a palavra</h1>
        <h3 className="tip">
          Dica sobre a palavra <span>{pickedCategory}</span>
        </h3>
         <p>Você ainda tem {guesses} tentativas</p>
         <div className="wordContainer">
           {letters.map((letters,i)=>(
              guessedLetters.includes(letters) ? (
                <span key = {i} className="letter" >{letters}</span>
              ):(
                <span key = {i} className="blackSquare" ></span>
                )
           ))}
         </div>
         <div className="lettercontainer">
          <p> Tente adivinhar uma letra da palavra</p>
          <form onSubmit={handleSubmit}>
            <input 
            id="letter" 
            type="text"  
            name="letter" 
            maxLength= "1" 
            required 
            onChange={(e)=> setLetter(e.target.value)} 
            value={letter}
            ref={letterInputRef}/>
            <button type="submit" id='input_f'>Jogar</button>

              </form>
         </div>
          <div className="worngLettersContainer">
              <p> Letras já utilizadas</p>
                {wrongLetters && wrongLetters.map((letter, i) => (
                  <span key={i}>{letter},</span>
                ))}
          </div>

      </div>
          </div>
  )
}

export default Game