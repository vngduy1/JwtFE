import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './nav.scss'

function Nav(props) {
  const [isShow, setIsShow] = useState(true)

  let location = useLocation()
  useEffect(() => {
    if (location.pathname === '/login') {
      setIsShow(false)
    }
  }, [])
  return (
    <>
      {isShow === true && (
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">users</NavLink>
          <NavLink to="/projects">projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </>
  )
}

export default Nav
