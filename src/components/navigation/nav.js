import React, { useContext } from 'react'
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom'
import './nav.scss'
import { UserContext } from '../../context/UserContext'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../logo.svg'
import { logoutUser } from '../../services/userService'
import { toast } from 'react-toastify'

const NavHeader = (props) => {
  const { user, logoutContext } = useContext(UserContext)
  const location = useLocation()
  const history = useHistory()
  const handleLogout = async () => {
    let data = await logoutUser()
    localStorage.removeItem('jwt')
    logoutContext()
    if (data && +data.EC === 0) {
      toast.success('Logout success')
      history.push('/login')
    } else {
      toast.error(data.EM)
    }
  }

  if ((user && user.isAuthenticated === true) || location.pathname === '/') {
    return (
      <>
        <div className="nav-header">
          <Navbar expand="lg" className="header bg-body-tertiary" bg="header">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                <span className="brand-name">DVN</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className="nav-link">
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/users">
                    users
                  </NavLink>
                  <NavLink className="nav-link" to="/projects">
                    projects
                  </NavLink>
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className="nav-link">
                        こんにちは {user.account.username}
                      </Nav.Item>
                      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item>Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <span onClick={() => handleLogout()}>Log out</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    )
  } else {
    return <></>
  }
}

export default NavHeader
