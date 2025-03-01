import { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          aria-label="title"
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          aria-label="author"
          onChange={event => setAuthor(event.target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          aria-label="url"
          onChange={event => setUrl(event.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm