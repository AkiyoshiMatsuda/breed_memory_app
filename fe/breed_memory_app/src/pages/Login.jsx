import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      // API接続処理
      const response =await fetch("http://localhost:5000/users/login",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          email:email,
          password:password
        })
      });
      const data = await response.json();
      if (response.status === "success") {
        console.log("Login successful");
        navigate("/home");
      }else{
        console.log("Login failed");
        setError(data.message);
      }
     }catch(error){
      console.error(error);
      setError("サーバーとの通信に失敗しました")
     }
    // console.log({ email, password });

    // // 今はAPI未接続なので仮でホームへ
    // navigate("/home");
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
}

export default Login;