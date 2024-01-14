import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import _ from 'lodash'
import Nav from './components/navigation/nav'
import AppRoutes from './routes/appRoute'
function App() {
  const [account, setAccount] = useState({})

  useEffect(() => {
    let session = sessionStorage.getItem('account')
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])
  return (
    <>
      <Router>
        <div className="app-header">
          {/* {account && !_.isEmpty(account) && account.isAuthenticated &&} */}
          <Nav />
        </div>
        <div className="app-container">
          <AppRoutes />
        </div>
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
