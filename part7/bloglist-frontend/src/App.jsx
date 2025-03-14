import { useEffect } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import { sendError, sendSuccess } from './reducers/notificationReducer'
import {
  addBlog,
  addLike,
  appendComment,
  deleteBlog,
  getBloglist,
} from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import Blog from './components/Blog'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBloglist())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const createLogin = (loginObject) => {
    try {
      dispatch(login(loginObject))
      navigate('/')
    } catch (e) {
      dispatch(sendError('wrong username or password', 5))
    }
  }

  const createBlog = (blogObject) => {
    try {
      dispatch(addBlog(blogObject, user.token))
      dispatch(
        sendSuccess(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          5
        )
      )
      navigate('/')
    } catch (e) {
      dispatch(sendError('Add blog failed', 5))
    }
  }

  const handleComment = (blogObject) => {
    dispatch(appendComment(blogObject))
  }

  const handleLike = (blogObject) => {
    try {
      dispatch(addLike(blogObject))
    } catch (e) {
      dispatch(sendError('Add like failed', 5))
    }
  }

  const handleDeleteBlog = (id) => {
    try {
      dispatch(deleteBlog(id, user.token))
      navigate('/')
    } catch (e) {
      dispatch(sendError('Delete blog failed', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    navigate('/login')
  }

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  const userMatch = useMatch('/users/:id')
  const userBlogs = userMatch
    ? blogs.filter((blog) => blog.user.id === userMatch.params.id)
    : null

  return (
    <div className="container">
      <Menu user={user} handleLogout={handleLogout} />
      <Notification
        message={notification.message}
        variant={notification.variant}
      />
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              addComment={handleComment}
              addLike={handleLike}
              deleteBlog={handleDeleteBlog}
            />
          }
        />
        <Route path="/create" element={<BlogForm createBlog={createBlog} />} />
        <Route
          path="/login"
          element={<LoginForm createLogin={createLogin} />}
        />
        <Route path="/users" element={<UserList blogs={blogs} />} />
        <Route
          path="/users/:id"
          element={<UserDetails userBlogs={userBlogs} />}
        />
      </Routes>
    </div>
  )
}

export default App
