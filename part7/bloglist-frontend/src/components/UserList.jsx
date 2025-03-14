import { Alert, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserList = ({ blogs }) => {
  if (blogs.length <= 0) {
    return <Alert variant={'info'}>No user info found</Alert>
  }

  const userList = []
  Map.groupBy(blogs, (blog) => blog.user.username).forEach((value, key) => {
    userList.push({
      username: key,
      numBlogs: value.length,
      id: value.length > 0 ? value[0].user.id : '',
    })
  })
  return (
    <>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.numBlogs}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default UserList
