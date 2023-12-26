// CSS

import './App.css';

// React
import { useCallback,useState, useEffect } from 'react';
// data
import {wordList}from "./data/words"
// Components
import Inicialization from './components/Inicialization';
import Game from './components/Game';
import GameOver from "./components/GameOver";
function App() {
  const stages = [
    { id: 1, name: 'start' },
    { id: 2, name: 'game' },
    { id: 3, name: 'end' },
  ];

  const guessesQty = 3;

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickedWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    // clear all letters
    clearLetterStates();
     setGuesses(guessesQty)
    const { word, category } = pickedWordAndCategory();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((w) => w.toLowerCase());

    setGameStage(stages[1].name);
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
  },[stages,pickedWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase();

    if (guessedLetters.includes(normalizeLetter) || wrongLetters.includes(normalizeLetter)) {
      return;
    }

    if (letters.includes(normalizeLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizeLetter]);
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizeLetter]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses, stages]);
   useEffect (()=>{
      const uniqueLetters=[... new Set(letters)]
      if (guessedLetters.length === uniqueLetters.length){
          //add score
          setScore((acualScore)=> acualScore+=100)
          // restart game
          startGame()
      }
      console.log(uniqueLetters)
   }, [guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <Inicialization startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
