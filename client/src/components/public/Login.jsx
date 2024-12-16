import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import MemberPage from "../private/MemberPage";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/login",
        {
          email,
          password,
          rememberMe,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      //localStorage.setItem("loggedIn", true);

      setMessage(`Login successful!`);
      navigate("/MemberPage");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <main className = "layout">
      <div className = "form-box">
        <h1 className = "title">Welcome Back !</h1>
        <form id = "login-form" action = "" method = "">
          <div className = "input-text">
            <input
              type = "text"
              id = "email"
              name = "email"
              placeholder = "Enter email"
              value = {email}
              onChange = {(e) => setEmail(e.target.value)}
              required
            />{" "}
            <input
              type = "password"
              id = "password"
              name = "password"
              placeholder = "Enter password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
              required
            />{" "}
          </div>
          <div className = "options">
            <input
              type = "checkbox"
              id = "remember"
              name = "remember"
              checked = {rememberMe}
              onChange = {(e) => setRememberMe(e.target.checked)}
            />{" "}
            <label htmlFor = "remember">Remember me</label>{" "}
            <a className = "forgot" href = "#">
              Forgot Password?
            </a>
          </div>
          {message && <p className = "login-error-message">{message}</p>} 
          <button className = "double-btn" type = "submit" onClick = {handleLogin}>
            Log In
          </button>
        </form>
        <div>
            <p>
              Don't have an account? <Link to = "/Register">&nbsp;Register</Link>
            </p>
        </div>
      </div>

      <div className = "footer">
            <footer>
                <p> &copy; 2024 Bookify! McGill University  </p>
            </footer>
        </div>

    </main>
  );
}

export default Login;
