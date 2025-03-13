import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'

const initialState = null

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userReducer.actions

export const login = (loginObject) => {
  return async (dispatch) => {
    const user = await loginService.login(loginObject)
    dispatch(setUser(user))
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(initialState))
    window.localStorage.removeItem('loggedBlogappUser')
  }
}

export default userReducer.reducer
