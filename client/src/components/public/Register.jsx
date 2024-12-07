import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password != confirmation) {
      setMessage("Password inputs don't match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email,
          password,
          confirmPassword: confirmation,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div class="glass-container">
      <h1 class="title">Sign Up</h1>
      <form id="login_form" action="" method="">
        <div class="input-text">
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
          <input
            type="password"
            id="confirmation"
            name="confirmation"
            placeholder="Confirm password"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            required
          />{" "}
          <br />
        </div>
        <button class="btn" type="submit" onClick={handleRegister}>
          Sign Up
        </button>
        {message && <p>{message}</p>}
        <div>
          <p>
            Already have an account?{" "}
            <Link to="/Login">&nbsp;&nbsp;Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
