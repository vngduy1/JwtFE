import "./register.scss";
import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { useEffect } from "react";

const Register = (props) => {
  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  //   useEffect(() => {
  //     axios.get("http://localhost:8081/api/test-api").then((data) => {
  //       console.log("data", data);
  //     });
  //   }, []);
  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-3">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">DVN</div>
            <div className="detail">Test detail</div>
          </div>
          <form className="content-right col-sm-5 d-flex flex-column gap-3 py-3">
            <h3 className="brand d-sm-none text-center">アカウント登録</h3>
            <div>簡単に登録できます。</div>
            <div className="row g-3">
              <div className="col">
                <input type="text" className="form-control" placeholder="姓" />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="名" />
              </div>
            </div>
            <div className="form-group">
              <label>メールアドレス</label>
              <input
                type="text"
                className="form-control"
                placeholder="メールアドレス"
              />
            </div>
            <div className="form-group">
              <label>携帯電話番号</label>
              <input
                type="text"
                className="form-control"
                placeholder="携帯電話番号"
              />
            </div>
            <div className="form-group">
              <label>User name</label>
              <input
                type="text"
                className="form-control"
                placeholder="UserName"
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label>パスワード</label>
              <input
                type="password"
                className="form-control"
                placeholder="パスワードを入力してください"
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label>Re-render パスワード</label>
              <input
                type="password"
                className="form-control"
                placeholder="パスワードを入力してください"
                autoComplete="new-password"
              />
            </div>
            <button className="btn btn-primary">Register</button>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
