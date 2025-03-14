import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              home
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/create">
              new blog
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user === null ? (
              <Link style={padding} to="/login">
                login
              </Link>
            ) : (
              <em style={padding}>{user.name} logged in</em>
            )}
          </Nav.Link>
          {user ? (
            <Nav.Link href="#" as="span">
              <Button onClick={handleLogout}>logout</Button>
            </Nav.Link>
          ) : (
            <></>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
