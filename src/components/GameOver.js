import "./GameOver.css"

const GameOver = ({retry, score}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
       <input id='input_f' type="button" value="Resetar Jogo"  onClick={retry}/>
    </div>
    
  )
}

export default GameOver