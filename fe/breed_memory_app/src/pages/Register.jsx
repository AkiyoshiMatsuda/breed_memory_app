import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // 今はAPI未接続なので仮でログイン画面へ
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>新規登録</h1>

      <form onSubmit={handleRegister} className="form">
        <input type="text" placeholder="ユーザー名" />
        <input type="email" placeholder="メールアドレス" />
        <input type="password" placeholder="パスワード" />

        <button type="submit">登録</button>
      </form>

      <p>
        すでにアカウントがある場合は <Link to="/login">ログイン</Link>
      </p>
    </div>
  );
}

export default Register;