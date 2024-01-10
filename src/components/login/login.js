import "./login.scss";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/register");
  };
  return (
    <div className="login-container">
      <div className="container">
        <form className="row px-3 px-sm-3">
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
                className="form-control"
                placeholder="メールアドレスまた電話番号"
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label>パスワード</label>
              <input
                type="password"
                className="form-control"
                placeholder="パスワード"
                autoComplete="current-password"
              />
            </div>
            <button className="btn btn-primary">ログイン</button>
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
  );
};

export default Login;
