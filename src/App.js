import React from 'react'
import { useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import _ from 'lodash'
import NavHeader from './components/navigation/nav'
import AppRoutes from './routes/appRoute'
import { Rings } from 'react-loader-spinner'
import { UserContext } from './context/UserContext'
import './App.scss'

function App() {
  const { user } = useContext(UserContext)

  return (
    <>
      <Router>
        {user && user.isLoading ? (
          <div className="loading-container">
            <Rings
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
            />
            <div>Loading</div>
          </div>
        ) : (
          <>
            <div className="app-header">
              <NavHeader />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </>
  )
}

export default App
