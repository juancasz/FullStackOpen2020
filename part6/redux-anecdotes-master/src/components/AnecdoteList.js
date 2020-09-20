import React from 'react'
import {  connect } from 'react-redux'
import { voteAnecdote} from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const filter = props.filter.toLowerCase()

    const vote = (id) => {
        console.log('vote', id)
        const anecdote = props.anecdotes.find(a => a.id === id)
        props.voteAnecdote(id,anecdote)
        props.setMessage(`you voted '${anecdote.content}'`,5)
    }
    
    const listAnecdotes = props.anecdotes.sort((a,b) => b.votes-a.votes)
    const anecdotesDisplay = filter === ""?
                                listAnecdotes:
                                listAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))

    return(
        <div>
            {anecdotesDisplay.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    // sometimes it is useful to console log from mapStateToProps
    console.log(state)
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setMessage
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList