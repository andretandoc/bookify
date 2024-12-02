import { useState } from "react";
import axios from "axios";

// this component is an example of how use the /register and /login API that I made
// you can use it for testings or as a reference for other components

const ApiTest = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email,
          password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      setMessage(`Login successful! Token: ${token}`);
    } catch (error) {
      setMessage(error.response.data.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>API Test</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApiTest;
