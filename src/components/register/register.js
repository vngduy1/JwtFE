import './register.scss'
import { useHistory } from 'react-router-dom'
// import axios from "axios";
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { registerNewUser } from '../../services/userService'

const Register = (props) => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  }
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

  let history = useHistory()
  const handleLogin = () => {
    history.push('/login')
  }

  const isValidInputs = () => {
    // if (!firstName) {
    //   toast.error("firstName is required");
    //   return false;
    // }

    // if (!lastName) {
    //   toast.error("lastName is required");
    //   return false;
    // }

    if (!email) {
      toast.error('email is required')
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
      return false
    }

    let re = /\S+@\S+\.\S+/
    if (!re.test(email)) {
      toast.error('Email không hợp lệ')
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
    }

    if (!phone) {
      toast.error('phone is required')
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false })
      return false
    }

    if (!password) {
      toast.error('password is required')
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
      return false
    }
    if (password !== confirmPassword) {
      toast.error('your password is not the same')
      setObjCheckInput({
        ...defaultValidInput,
        isValidConfirmPassword: false,
      })
      return false
    }

    return true
  }

  const handleRegister = async () => {
    let check = isValidInputs()
    if (check === true) {
      let response = await registerNewUser(email, phone, username, password)
      let serverData = response.data
      if (+serverData.EC === 0) {
        toast.success(serverData.EM)
        history.push('/login')
      } else {
        toast.error(serverData.EM)
      }
    }
  }

  return (
    <div className="register-container">
      <div className="container">
        <form className="row px-3 px-sm-3" onSubmit={(e) => e.preventDefault()}>
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">DVN</div>
            <div className="detail">Test detail</div>
          </div>
          <div className="content-right col-sm-5 d-flex flex-column gap-3 py-3">
            <h3 className="brand d-sm-none text-center">アカウント登録</h3>
            <div>簡単に登録できます。</div>
            {/* <div className="row g-3">
              <div className="col">
                <input
                  type="text"
                  className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                  placeholder="姓"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                  placeholder="名"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div> */}
            <div className="form-group">
              <label>メールアドレス</label>
              <input
                type="text"
                className={
                  objCheckInput.isValidEmail
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>携帯電話番号</label>
              <input
                type="text"
                className={
                  objCheckInput.isValidPhone
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder="携帯電話番号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>User name</label>
              <input
                type="text"
                className="form-control"
                placeholder="UserName"
                autoComplete="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>パスワード</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidPassword
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder="パスワードを入力してください"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-render パスワード</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidConfirmPassword
                    ? 'form-control'
                    : 'form-control is-invalid'
                }
                placeholder="パスワードを入力してください"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <span className="text-center">
              <a className="forgot-password" href="/">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
