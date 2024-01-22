import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './nav.scss'
import { UserContext } from '../../context/UserContext'
function Nav(props) {
  const { user } = useContext(UserContext)
  const location = useLocation()

  if ((user && user.isAuthenticated === true) || location.pathname === '/') {
    return (
      <>
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">users</NavLink>
          <NavLink to="/projects">projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </>
    )
  } else {
    return <></>
  }
}

export default Nav
