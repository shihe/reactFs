const UserDetails = ({ userBlogs }) => {
  return (
    <>
      <h2>{userBlogs[0]?.user.username}</h2>
      <h4>added blogs</h4>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserDetails
