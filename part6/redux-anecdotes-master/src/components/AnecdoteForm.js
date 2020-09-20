import React from 'react'
import { connect } from 'react-redux'
import {newAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = '' 
        props.newAnecdote(content)
        props.setMessage(`you added '${content}'`,5)
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addNew}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const ConnectedAnecdoteForm = connect(
    null,
    {newAnecdote,setMessage}
)(AnecdoteForm)
  
export default ConnectedAnecdoteForm
