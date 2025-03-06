import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`you voted \'${anecdote.content}\'`, 5))
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList