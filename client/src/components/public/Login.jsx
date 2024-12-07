import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

function Login( { setToken } ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const token = await loginUser({
        email,
        password
      });
      setToken(token);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
          rememberMe,
        }
      );
      // const token = response.data.token;
      setMessage(`Login successful!`);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <main>
      <div className="glass-container">
        <h1 className="title">Login</h1>
        <form id="login_form" action="" method="">
          <div className="input-text">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />{" "}
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />{" "}
            <br />
          </div>
          <div className="options">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />{" "}
            <label htmlFor="remember">Remember me</label>{" "}
            <a className="forgot" href="#">
              Forgot Password?
            </a>
          </div>
          <button className="btn" type="submit" onClick={handleLogin}>
            Log In
          </button>
          {message && <p className="error-message">{message}</p>}
          <div>
            <p>
              Don't have an account?{" "}
              <Link to="/Register">&nbsp;Register</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}



export default Login;
