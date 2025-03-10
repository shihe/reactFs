import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const hideDetails = { display: showDetails ? 'none' : '' }
  const showWithDetails = { display: showDetails ? '' : 'none' }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = (event) => {
    event.preventDefault()
    addLike(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user?.name
    })
  }

  const removeBlog = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      event.preventDefault()
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog">
      <div style={hideDetails} aria-label="hide-details">
        <div>
          {blog.title} {blog.author} <button onClick={toggleShowDetails}>view</button>
        </div>
      </div>
      <div style={showWithDetails} aria-label="show-details">
        <div>
          {blog.title} {blog.author} <button onClick={toggleShowDetails}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        <div><button onClick={removeBlog}>remove</button></div>
      </div>
    </div>
  )
}

export default Blog