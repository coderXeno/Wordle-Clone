import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Key({keyVal,bigKey,disabled}){

    const {
        onEnter,
        onSelectLetter,
        onDeleteLetter
    } = useContext(AppContext);

    function selectLetter(){

        if(keyVal === "ENTER"){
            onEnter();
        } else if(keyVal === "DELETE"){
            onDeleteLetter();
        } else {
            onSelectLetter(keyVal);
        }
    };

    return(
        <div className="key" id={bigKey ? "big": disabled && "disabled"} onClick={selectLetter}>
            {keyVal}
        </div>
    )
}