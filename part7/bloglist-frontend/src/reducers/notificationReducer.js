import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    variant: '',
  },
  reducers: {
    setSuccessMessage(state, action) {
      return {
        message: action.payload,
        variant: 'success',
      }
    },
    setErrorMessage(state, action) {
      return {
        message: action.payload,
        variant: 'danger',
      }
    },
  },
})

export const { setSuccessMessage, setErrorMessage } = notificationSlice.actions

// Action creators
export const sendSuccess = (content, seconds) => {
  return async (dispatch) => {
    dispatch(setSuccessMessage(content))
    setTimeout(() => dispatch(setSuccessMessage(null)), seconds * 1000)
  }
}

export const sendError = (content, seconds) => {
  return async (dispatch) => {
    dispatch(setErrorMessage(content))
    setTimeout(() => dispatch(setErrorMessage(null)), seconds * 1000)
  }
}

export default notificationSlice.reducer
