import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Registering user:", { username, password });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/register`,
        {
          username,
          password,
        }
      );
      console.log("Registration successful:", res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/chat");
    } catch (err) {
      console.error(
        "Registration error:",
        err.response ? err.response.data : err.message
      );
      setError("User already exists");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
