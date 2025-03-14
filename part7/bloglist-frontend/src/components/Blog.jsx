import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = ({ blog, addComment, addLike, deleteBlog }) => {
  const [comment, setComment] = useState([])

  if (!blog) {
    return null
  }

  const handleLike = (event) => {
    event.preventDefault()
    addLike({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const removeBlog = (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      event.preventDefault()
      deleteBlog(blog.id)
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    const appendedComments = blog.comments
      ? [...blog.comments, comment]
      : [comment]
    addComment({
      ...blog,
      comments: appendedComments,
    })
  }

  return (
    <div className="container">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <Link to={`${blog.url}`}>{blog.url}</Link>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      {blog.user?.name && <div>added by {blog.user?.name}</div>}
      <div>
        <button onClick={removeBlog}>remove</button>
      </div>
      <h4>comments</h4>
      <Form onSubmit={handleComment}>
        <Form.Group as={Row}>
          <Col sm={10}>
            <Form.Control
              type="text"
              aria-label="comment"
              onChange={(event) => setComment(event.target.value)}
            />
          </Col>
          <Col sm={2}>
            <Button variant="primary" type="submit">
              add comment
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <ul>
        {blog.comments && blog.comments.map((comment) => <li>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog
