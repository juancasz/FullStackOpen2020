import React,{useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return(
    <button onClick ={props.handleClick}>
      {props.text}
    </button>
  )
}

const Header = (props) => {
  return(
    <>
      <h2>{props.text}</h2>
    </>
  )
}

const Statistic = (props) => {
  if(props.text === "positive"){
    return(
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}%</td>
      </tr>
    )
  }
  return(
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const{good,neutral,bad} = props
  let all = good+neutral+bad

  if(all === 0){
    return(
      <>
        <Header text="statistics" />
        <p>No feedback given</p>
      </>
    )
  }
  return(
    <>
    <Header text="statistics" />
    <table>
      <tbody>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="average" value={(good*1+neutral*0+bad*-1)/all}/>
        <Statistic text="positive" value={good*100/all}/>
      </tbody>
    </table>
    </>
  )
}

const App = props => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodTo = (newValue) => {
    setGood(newValue)
  }

  const setNeutralTo = (newValue) => {
    setNeutral(newValue)
  }

  const setBadTo = (newValue) => {
    setBad(newValue)
  }
  
  return(
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGoodTo(good+1)} text="good" />
      <Button handleClick={() => setNeutralTo(neutral+1)} text="neutral" />
      <Button handleClick={() => setBadTo(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)

