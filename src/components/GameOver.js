import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

export default function GameOver(){

    const {
        gameOver,
        setGameOver,
        correctWord,
        currAttempt
    } = useContext(AppContext);

    return(
        <div className="gameOver">
            <h1>Correct Word: {correctWord}</h1>
            <h3>{gameOver.guessedWord ? "You guessed correctly" : "Wrong Word!"}</h3>
            {gameOver.guessedWord && (<h3>You guessed in {currAttempt.attempt}</h3>)}
        </div>
    )
}