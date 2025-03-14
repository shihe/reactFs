import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => (
  <>
    <h2>Blogs</h2>
    <Table striped>
      <tbody>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  </>
)

export default BlogList
