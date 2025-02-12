import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Anecdote = ({ anecdote, title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{anecdote.text}</p>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { text: 'If it hurts, do it more often.', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0 },
    { text: 'The only way to go fast, is to go well.', votes: 0 }
  ])

  const addVote = (selected, anecdotes) => {
    const copy = [...anecdotes]
    copy[selected].votes += 1
    setAnecdotes(copy)
  }

  const getMostPopularAnecdote = (anecdotes) => {
    return anecdotes.reduce((prev, current) => (prev.votes > current.votes) ? prev : current)
  }

  const [selected, setSelected] = useState(0)

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} title='Anecdote of the day' />
      <Button onClick={() => addVote(selected, anecdotes)} text='vote' />
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote' />
      <Anecdote anecdote={getMostPopularAnecdote(anecdotes)} title='Anecdote with most votes' />
    </div>
  )
}

export default App