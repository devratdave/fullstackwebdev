import { useState } from 'react'
import Header from "./components/Header"
import Button from "./components/Button"
import StatLine from "./components/StatLine"

function App() {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  if(good+bad+neutral!=0){
    return (
      <div>
        <Header title="give feedback" /><br/>
        <Button onClick={()=>setGood(good+1)} action="good" />
        <Button onClick={()=>setNeutral(neutral+1)} action="neutral" />
        <Button onClick={()=>setBad(bad+1)} action="bad" />
        <br/>
        <Header title="statistics" />
        <StatLine name="good" value={good} description="reviews"/>
        <StatLine name="neutral" value={neutral} description="reviews"/>
        <StatLine name="bad" value={bad} description="reviews"/>
        <StatLine name="total" value={good+bad+neutral} description="reviews" />
        <StatLine name="average" value={(good-bad)/(good+bad+neutral)} description="rating" />
        <StatLine name="positive" value={(good*100)/(good+bad+neutral)} description="%" />
  
      </div>
    )
  } else {
    return(
      <div>
        <Header title="give feedback" /><br/>
        <Button onClick={()=>setGood(good+1)} action="good" />
        <Button onClick={()=>setNeutral(neutral+1)} action="neutral" />
        <Button onClick={()=>setBad(bad+1)} action="bad" />
        <br/>
        <Header title="statistics" />
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  
}

export default App
