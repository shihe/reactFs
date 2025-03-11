import { Table } from 'react-bootstrap'
import Blog from './Blog'

const BlogList = ({ blogs, addLike, deleteBlog }) => (
  <>
    <h2>Blogs</h2>
    <Table striped>
      <tbody>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              deleteBlog={deleteBlog}
            />
          ))}
      </tbody>
    </Table>
  </>
)

export default BlogList
