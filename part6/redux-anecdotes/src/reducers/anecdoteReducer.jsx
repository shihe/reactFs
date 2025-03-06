import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVote(state, action) {
      const updatedAnecdote = action.payload
      return state
        .map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { updateVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const anecdoteToChange = await anecdoteService.get(id)
    const updatedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
    const updateAnecdoteResponse = await anecdoteService.update(updatedAnecdote)
    dispatch(updateVote(updateAnecdoteResponse))
  }
}

export default anecdoteSlice.reducer