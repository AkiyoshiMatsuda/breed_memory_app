import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 今はAPI未接続なので仮でホームへ
    navigate("/home");
  };

  return (
    <div className="container">
      <h1>ログイン</h1>

      <form onSubmit={handleLogin} className="form">
        <input type="email" placeholder="メールアドレス" />
        <input type="password" placeholder="パスワード" />

        <button type="submit">ログイン</button>
      </form>

      <p>
        アカウントがない場合は <Link to="/register">新規登録</Link>
      </p>
    </div>
  );
}

export default Login;