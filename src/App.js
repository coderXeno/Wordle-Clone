import { useEffect } from 'react';
import { useState,createContext } from 'react';
import './App.css';
import Board from './components/Board';
import GameOver from './components/GameOver';
import Keyboard from './components/Keyboard';
import { boardDefault, generateWordSet } from './Words';

export const AppContext = createContext();

function App() {

  const [board,setBoard] = useState(boardDefault);
  const [currAttempt,setCurrAttempt] = useState({
    attempt: 0,
    letterPos: 0
  });
  const [wordSet,setWordSet] = useState(new Set());
  const [disabledLetters,setDisabledLetters] = useState([]);
  const [gameOver,setGameOver] = useState({
    gameOverTrue: false,
    guessedWord: false
  });
  const [correctWord,setCorrectWord] = useState("");

  useEffect(()=>{
    generateWordSet()
      .then((words)=>{
        setWordSet(words.wordSet);
        setCorrectWord(words.todaysWord);
      })
  },[]);

  function onSelectLetter(keyVal){
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard)
    setCurrAttempt({
        ...currAttempt,
        letterPos: currAttempt.letterPos + 1
    });
  };

  function onDeleteLetter(){
    if(currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({
        ...currAttempt,
        letterPos: currAttempt.letterPos - 1
    });
  };

  function onEnter(){
    if(currAttempt.letterPos !==5) return;

    let currWord = "";
    for(let i=0;i<5;i++){
      currWord+=board[currAttempt.attempt][i ];
    }

    if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({
        attempt: currAttempt.attempt + 1,
        letterPos: 0
      });
    } else {
      alert("Word Not found.")
    } 

    if(currWord === correctWord){
      setGameOver({
        gameOverTrue: true,
        guessedWord: true
      });
      return;
    }

    if(currAttempt.attempt === 5){
      setGameOver({
        gameOverTrue: true,
        guessedWord: false
      });
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>

      <AppContext.Provider value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDeleteLetter,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver
      }}>
        <div className='game'>
          <Board/>
          {gameOver.gameOverTrue ? <GameOver/> : <Keyboard/>}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
