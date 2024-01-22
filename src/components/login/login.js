import { useState, useContext } from 'react'
import './login.scss'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { loginUser } from '../../services/userService'
import { UserContext } from '../../context/UserContext'

const Login = (props) => {
  const { loginContext } = useContext(UserContext)
  let history = useHistory()

  const [valueLogin, setValueLogin] = useState('')
  const [password, setPassword] = useState('')

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  }
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput)

  const handleCreateNewAccount = () => {
    history.push('/register')
  }

  const handleLogin = async () => {
    if (!valueLogin) {
      setObjValidInput({
        ...defaultObjValidInput,
        isValidValueLogin: false,
      })
      toast.error('メールアドレスまた電話番号を入力してください')
      return
    }
    if (!password) {
      setObjValidInput({
        ...defaultObjValidInput,
        isValidPassword: false,
      })
      toast.error('パスワードは違いました')
      return
    }

    let response = await loginUser(valueLogin, password)

    if (response) {
      let groupWithRoles = response.DT.groupWithRoles
      let email = response.DT.email
      let username = response.DT.username
      let token = response.DT.access_token
      let data = {
        isAuthenticated: true,
        token: token,
        account: { groupWithRoles, email, username },
      }
      loginContext(data)
      history.push('/users')
    }
    if (response && +response.EC !== 0) {
      toast.error(response.EM)
    }
  }
  return (
    <div className="login-container">
      <div className="container">
        <form className="row px-3 px-sm-3" onSubmit={(e) => e.preventDefault()}>
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">DVN</div>
            <div className="detail">Test detail</div>
          </div>
          <div className="content-right col-sm-5 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none text-center">DVN</div>

            <div className="form-group">
              <label>メールアドレスまた電話番号</label>
              <input
                type="text"
                className={
                  objValidInput.isValidValueLogin
                    ? 'form-control'
                    : 'is-invalid form-control'
                }
                placeholder="メールアドレスまた電話番号"
                autoComplete="email"
                value={valueLogin}
                onChange={(e) => {
                  setValueLogin(e.target.value)
                }}
              />
            </div>
            <div className="form-group">
              <label>パスワード</label>
              <input
                type="password"
                className={
                  objValidInput.isValidPassword
                    ? 'form-control'
                    : 'is-invalid form-control'
                }
                placeholder="パスワード"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => handleLogin()}
            >
              ログイン
            </button>
            <span className="text-center">
              <a className="forgot-password" href="/">
                パスワードを忘れた場合
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                新しいアカウントを作成
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
