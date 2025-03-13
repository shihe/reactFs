import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const setupStore = (preloadedState) =>
  configureStore({
    reducer: {
      notification: notificationReducer,
      blogs: blogReducer,
      user: userReducer,
    },
    preloadedState,
  })

export default setupStore
