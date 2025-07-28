import { useSelector, useDispatch } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const handleVote = (dispatch, anecdote) => {
  dispatch(vote(anecdote))
  dispatch(notify(`You voted for '${anecdote.content}'`, 5))
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes
      .filter(anecdote => anecdote.content.includes(filter))
      .toSorted( (a, b) => b.votes - a.votes)
  })

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(dispatch, anecdote)}
        />
      )}
    </>
  )
}

export default AnecdoteList
