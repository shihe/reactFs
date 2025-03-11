import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
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
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>author:</Form.Label>
        <Form.Control
          type="text"
          name="author"
          onChange={(event) => setAuthor(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>url:</Form.Label>
        <Form.Control
          type="text"
          name="url"
          onChange={(event) => setUrl(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        create
      </Button>
    </Form>
  )
}

export default BlogForm
