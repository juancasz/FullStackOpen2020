import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case "VOTE":
      const updatedAnecdote = action.data
      const id = action.data.id
      return state.map(anecdote => anecdote.id === id? updatedAnecdote:anecdote)
    case "NEW_ANECDOTE":
      return [...state,action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const newAnecdote = (content) =>{
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type : 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (id,anecdote) => {
  return async dispatch => {  
    const changedAnecdote = {...anecdote,votes:anecdote.votes+1}
    const updatedAnecdote = await anecdoteService.update(id,changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer