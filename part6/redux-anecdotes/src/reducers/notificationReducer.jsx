import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    clearNotification(state, action) {
      return null
    },
    sendNotification(state, action) {
      return action.payload
    },
  }
})

export const { clearNotification, sendNotification } = notificationSlice.actions
export default notificationSlice.reducer