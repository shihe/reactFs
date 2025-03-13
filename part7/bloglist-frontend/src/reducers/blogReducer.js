import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
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

export const { appendBlog, incrementLike, removeBlog, setBloglist } =
  blogSlice.actions

// Action creators
export const addBlog = (blogObject, token) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(blogObject, token)
    return dispatch(appendBlog(addedBlog))
  }
}

export const addLike = (blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogObject)
    return dispatch(incrementLike(updatedBlog))
  }
}

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    await blogService.remove(id, token)
    return dispatch(removeBlog(id))
  }
}

export const getBloglist = () => {
  return async (dispatch) => {
    const bloglist = await blogService.getAll()
    dispatch(setBloglist(bloglist))
  }
}

export default blogSlice.reducer
