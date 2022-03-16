import React from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { AppContext } from "../App";
import Key from "./Key";

export default function Keyboard(){

    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];    

    const {
        onEnter,
        onSelectLetter,
        onDeleteLetter,
        disabledLetters
    } = useContext(AppContext);

    const handleKeyPress = useCallback((event)=>{
        if (event.key.toUpperCase() === "ENTER"){
            onEnter();
        } else if (event.key === "Backspace"){
            onDeleteLetter();
        } else {
            keys1.forEach((key)=>{
                if (event.key.toLowerCase() === key.toLowerCase()){
                    onSelectLetter(key);
                }
            });

            keys2.forEach((key)=>{
                if (event.key.toLowerCase() === key.toLowerCase()){
                    onSelectLetter(key);
                }
            });

            keys3.forEach((key)=>{
                if (event.key.toLowerCase() === key.toLowerCase()){
                    onSelectLetter(key);
                }
            });
        }
    });

    useEffect(()=>{
        document.addEventListener("keydown", handleKeyPress);

        return ()=>{
            document.removeEventListener("keydown",handleKeyPress);
        }
    },[handleKeyPress]);

    return(
        <div className="keyboard" onKeyDown={handleKeyPress}>
            <div className="line1">
                {keys1.map((key) => {
                return <Key keyVal={key} disabled={disabledLetters.includes(key)} />;
                })}
            </div>

            <div className="line2">
                {keys2.map((key) => {
                    return <Key keyVal={key} disabled={disabledLetters.includes(key)} />;
                })}
            </div>

            <div className="line3">
                <Key keyVal={"ENTER"} bigKey={true}/>
                {keys3.map((key) => {
                  return <Key keyVal={key} disabled={disabledLetters.includes(key)} />;
                })}
                <Key keyVal={"DELETE"} bigKey={true}/>
            </div>
        </div>
    );
};