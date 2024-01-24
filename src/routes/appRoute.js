import { Switch, Route } from 'react-router-dom'

import Login from '../components/login/login'
import Register from '../components/register/register'
import Role from '../components/Role/Role'
import Users from '../components/manageUsers/Users'
import PrivateRoutes from './privateRoute'

const AppRoutes = () => {
  /**
   * quản lý theo đường link
   */
  const Project = () => {
    return (
      <>
        <span>projects</span>
      </>
    )
  }
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Project} />
        <PrivateRoutes path="/roles" component={Role} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/" exact>
          Home
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  )
}

export default AppRoutes
