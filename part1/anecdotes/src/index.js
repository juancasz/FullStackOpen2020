import React,{useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return(
    <button onClick={props.handle}>
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

const Anecdote = (props) => {
  return(
    <>
    {props.anecdotes[props.index]}<br/>
    has {props.votes[props.index]} votes<br/>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

  const setSelectedTo = (newValue) => {
    while(newValue === selected){
      newValue = Math.floor(Math.random()*props.anecdotes.length)
    }
    setSelected(newValue)
  }

  const setVotesTo = () => {
    const points = [...votes];
    points[selected]++;
    setVotes(points);
  }

  let biggest = 0
  let i = 0
  let indexMax = 0
  votes.forEach(vote => {
    if(vote>biggest){
      biggest = vote
      indexMax = i
    }
    i++;
  })

  let newValue = Math.floor(Math.random()*props.anecdotes.length)

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote anecdotes = {anecdotes} index={selected} votes={votes}/>
      <Button text="vote" handle={() => setVotesTo()}/>
      <Button text="next anecdote" handle={() => setSelectedTo(newValue)}/>
      <Header text="Anecdote with the most votes"/>
      <Anecdote anecdotes = {anecdotes} index={indexMax} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />, document.getElementById('root')
);


