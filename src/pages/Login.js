import React, { useState } from "react";
import { loginUser } from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await loginUser({ username, password });

    localStorage.setItem("token", res.data.access_token);

    window.location = "/quizzes";
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;