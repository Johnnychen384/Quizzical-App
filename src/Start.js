import React from "react"
import "./App.css"


export default function Start(props){
    return(
        <div className="startPage">
            <div className="topBlob"></div>
            <div className="startContainer">
                <h1>Quizzical</h1>
                <p>Click start button to start quiz</p>
                <button onClick={props.clickHandler}>Start quiz</button>
            </div>
            <div className="botBlob"></div>
        </div>
    )
}