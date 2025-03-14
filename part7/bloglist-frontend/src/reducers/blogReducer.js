import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { sendError } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    appendComment(state, action) {
      // TODO: Add comments to backend
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    incrementLike(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    setBloglist(state, action) {
      return action.payload
    },
  },
})

export const {
  appendBlog,
  appendComment,
  incrementLike,
  removeBlog,
  setBloglist,
} = blogSlice.actions

// Action creators
export const addBlog = (blogObject, token) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogService.create(blogObject, token)
      return dispatch(appendBlog(addedBlog))
    } catch (e) {
      dispatch(sendError('Add blog call failed', 5))
    }
  }
}

export const addLike = (blogObject) => {
  return async (dispatch) => {
    try {
      await blogService.update(blogObject)
      return dispatch(incrementLike(blogObject))
    } catch (e) {
      dispatch(sendError('Add like call failed', 5))
    }
  }
}

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id, token)
      return dispatch(removeBlog(id))
    } catch (e) {
      dispatch(sendError('Delete blog call failed', 5))
    }
  }
}

export const getBloglist = () => {
  return async (dispatch) => {
    try {
      const bloglist = await blogService.getAll()
      dispatch(setBloglist(bloglist))
    } catch (e) {
      dispatch(sendError('get bloglist call failed', 5))
    }
  }
}

export default blogSlice.reducer
