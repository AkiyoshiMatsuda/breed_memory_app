import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });

    // 今はAPI未接続なので仮でホームへ
    navigate("/home");
  };

  return (
    <div className="container">
      <h1>ログイン</h1>

      <form onSubmit={handleLogin} className="form">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">ログイン</button>
      </form>
      
      <p>
        アカウントがない場合は <Link to="/register">新規登録</Link>
      </p>
    </div>
  );
  console.log("Email:", email);
  console.log("Password:", password);
}

export default Login;