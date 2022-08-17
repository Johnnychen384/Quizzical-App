import React from "react"
import "./App.css"

export default function Quiz(props){
    const {question, toggle, check, restart, count, endGame} = props

    // creates an array containing markup with information from quiz state.
    const quiz = question.map(item => {

        // function to change background color of selected answer
        const changeBgColor = num => item.answers[num].selected ? "rgba(41, 50, 100, 1)" : "#FFFAD1"

        // function that changes color of words of selected answer
        const changeColor = num => item.answers[num].selected ? "white" : "#293264"

        return(
            <main key={item.id} className="flexQuiz">

                <h1>{item.question}</h1>
                <ul className="flexAnswer">

                    <li style={{backgroundColor: changeBgColor(0), 
                    color: changeColor(0)}} 
                    key={item.answers[0].id} 
                    onClick={() => {toggle(item.answers[0].id)}} >{item.answers[0].value}</li>

                    <li style={{backgroundColor: changeBgColor(1), 
                    color: changeColor(1)}} key={item.answers[1].id} 
                    onClick={() => {toggle(item.answers[1].id)}}>{item.answers[1].value}</li>

                    <li style={{backgroundColor: changeBgColor(2), 
                    color: changeColor(2)}} 
                    key={item.answers[2].id} 
                    onClick={() => {toggle(item.answers[2].id)}}>{item.answers[2].value}</li>

                    <li style={{backgroundColor: changeBgColor(3), 
                    color: changeColor(3)}} 
                    key={item.answers[3].id} 
                    onClick={() => {toggle(item.answers[3].id)}}>{item.answers[3].value}</li>

                </ul>
            </main>
        )
    })

    



    // checks the endGame state to determine what to render
    // if true it renders a h2 containing the counter state and a button containinig the content "play again"
    // if false it renders a "check answers" button
    return(
        <div className="quizContainer">
            {quiz}
            <div className="flexEl">
                {endGame && <h2>You scored {count}/5 correct answers</h2>}
                {!endGame ? <button onClick={check} >Check Answers</button> : <button onClick={restart} >Play Again</button>}
            </div>
            
        </div>
    )
}