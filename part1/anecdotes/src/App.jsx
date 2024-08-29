import { useState } from 'react'
import Header from "./components/Header"
import Button from "./components/Button"

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
    ]
  
  const [ selected, setSelected ] = useState(0)
  const [ votes, setVotes ] = useState([...anecdotes].fill(0))
  console.log(votes)
  const getRandomInt = (maxNum) => {
    return Math.floor(Math.random()*maxNum)
  }

  const findMax = (arr) => {
    let maxVal = arr[0]
    let maxIndex = 0
    for(let i = 1; i<arr.length; i++){
      if(arr[i] > maxVal){
        maxVal=arr[i]
        maxIndex=i
      }
    }
    return maxIndex
  }
  return (
    <div>
      <Header title="Anecdote the day" />
      <p>
        {anecdotes[selected]} <br /> has {votes[selected]} votes.
      </p>
      <Button onClick={()=>{
        setSelected(getRandomInt(anecdotes.length))}} action="next anecdote" />
      <Button onClick={()=>{
        let copy = [...votes]
        copy[selected]+=1
        setVotes(copy)
      }} action="vote" />
      <Header title="Anecdote with most votes" />
      <p>{anecdotes[findMax(votes)]} has {votes[findMax(votes)]} votes</p>
    </div>
  )
}

export default App
