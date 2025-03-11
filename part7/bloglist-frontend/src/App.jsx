import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Menu from './components/Menu'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
    } catch (e) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const addedBlog = await blogService.create(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setSuccessMessage(
        `a new blog ${addedBlog.title} by ${addedBlog.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      navigate('/')
    } catch (e) {
      setErrorMessage('Add blog failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (e) {
      setErrorMessage('Add like failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (e) {
      setErrorMessage('Delete blog failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="container">
      <Menu user={user} handleLogout={handleLogout} />
      <Notification message={errorMessage} variant={'danger'} />
      <Notification message={successMessage} variant={'success'} />
      <Routes>
        <Route
          path="/"
          element={
            <BlogList blogs={blogs} addLike={addLike} deleteBlog={deleteBlog} />
          }
        />
        <Route path="/create" element={<BlogForm createBlog={addBlog} />} />
        <Route path="/login" element={<LoginForm createLogin={login} />} />
      </Routes>
    </div>
  )
}

export default App
