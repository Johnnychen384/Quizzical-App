import Start from "./Start"
import './App';
import React from "react"
import Quiz from "./Quiz"
import {nanoid} from "nanoid"


function App() {

  // states
  const [gameStarted, setGameStarted] = React.useState(false)
  const [quiz, setQuiz] = React.useState([])
  const [selectedChoices, setSelectedChoices] = React.useState([])
  const [correct, setCorrect] = React.useState([])
  const [endGame, setEndGame] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const [gameReset, setGameReset] = React.useState(0)


  // sets the gameStarted state to true which tells react to render Quiz component
  function start(){
    setGameStarted(true)
  }

  // fetches quiz data and sets it to quiz state
  React.useEffect(() => {
    async function getData(){
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple")
      const data = await res.json()
      setQuiz(() => {

        const quizs = data.results.map(ob => {
          const allAnswers = [...ob.incorrect_answers, ob.correct_answer]
          allAnswers.sort()

          // creates a sorted array containing incorrect and correct answers.
          const allAnswersObject = allAnswers.map(item => {
              return {
                value: item,
                selected: false,
                id: nanoid()
              }
          })

          // passes array with all answers into object while also adding other properties
          return {
            answers: [...allAnswersObject],
            question: ob.question,
            id: nanoid(),
            correct: ob.correct_answer
          }
        })

        return quizs

      })
    }

    // code above this creates the getData function but doesnt call it so it doesnt retrieve data
    // until below is called
    getData()

    // checks to see if gameReset state changes, if so it re-fetches.
  }, [gameReset])



  // toggle is set to each quiz answer button
  // it allows the background color to change based on the selected property.
  function toggle(id){
    setQuiz(prevState => {

      const old = prevState.map(item => {

        // creates a new array containing all objects
        // if object id matches the passed in id from param then recreate the object changing the selected boolean
        const newAns = item.answers.map(el => {
          if(el.id === id){
            return {
              ...el,
              selected: !el.selected
            } 
          } else {
            return el
          }
        })

        // pass the above newAns array and prevStates items into a new object and returned to array called old
        return {
          ...item,
          answers: newAns
        }
      })

      // sets a new array containing all the arrays old data to quiz
      return [
        ...old
      ]
    })
  }


  // when button containing this is clicked it checks to see if all answers selected is correct/incorrect
  function checkAnswers(){
    let ans = []
    let selectedAns = quiz.map(item => {

      // checks if elements in item.answers is selected
      const el = item.answers.filter(element => {
        if(element.selected === true){
          return element
        }
      })

      // pushes everything inside el array to ans array.
      for(let i = 0; i < el.length; i++){
        ans.push(...el)
      }

      // returns el just to prevent bugs
      return el
    })


    // creates an array containing only that sessions correct answers for the quiz
    let correctAns = quiz.map(item => {
      return item.answers.filter(items => {
        if(item.correct === items.value){
          item.id = items.id
          return items.id
        }
      })
      
    })
    

    // condition which determines when this function will work
    // if the ans array is equal to 5 it means all quizs have been answered
    if(ans.length === 5){

      // sets the ans array to the selectedChoices state
      setSelectedChoices(ans)

      // loops through ans array and checks if each elements id is equal to the correct answers id.
      // if it is the state called counter will incre by 1
      for(let i = 0; i < ans.length; i++){
        if(ans[i].id === correctAns[i][0].id){
          setCounter(pre => pre + 1)

        } 

        // sets the endGame to true which allows the endGame button to render instead
        // set here because if this function works it means all the questions has been answered
        // and this round is over.
        setEndGame(true)
      }
    }
    
    // sets the array containing all the correct answers objects to the correct state.
    setCorrect(correctAns)
   
  }



  // restart function is set to the restart game button
  // sets endGame to false which allows the check again button to render instead
  // also increments the gameReset state which is what the useEffect dependecy is watching.
  // everytime gameReset increments new data is fetched and the quiz re-renders.
  function restart(){
    setEndGame(false)
    setGameStarted(true)
    setGameReset(pre => pre + 1)
  }
  
  
  return (
   
    <div>
      
      {!gameStarted ? <Start clickHandler={start}/> : 
      <Quiz question={quiz} endGame={endGame} toggle={toggle} check={checkAnswers} restart={restart} correct={correct} selectedChoices={selectedChoices} count={counter}/>}
      
    </div>
  );
}

export default App;
