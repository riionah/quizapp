import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {

      await registerUser({
        username: username,
        password: password
      });

      alert("User registered successfully");

      navigate("/");

    } catch (error) {
      alert("Error creating user");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={register}>
        Register
      </button>

    </div>
  );
}

export default Register;