import { Switch, Route } from 'react-router-dom'

import Login from '../components/login/login'
import Register from '../components/register/register'
import Role from '../components/Role/Role'
import GroupRole from '../components/groupRole/GroupRole'
import Users from '../components/manageUsers/Users'
import PrivateRoutes from './privateRoute'
import Home from '../components/home/Home'
import About from '../components/about/About'
import Project from '../components/projects/Project'

const AppRoutes = () => {
  /**
   * quản lý theo đường link
   */

  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/projects">
          <Project />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  )
}

export default AppRoutes
