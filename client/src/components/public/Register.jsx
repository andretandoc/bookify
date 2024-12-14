import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register({ setIsLoggedIn }) {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!email || !password || !confirmation || !fname || !lname) {
      setMessage("All fields are required. Please fill them out.");
      return;
    }

    // Check if passwords match
    if (password != confirmation) {
      setMessage("Password inputs don't match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5005/api/auth/register",
        {
          fname, 
          lname,
          email,
          password,
          confirmPassword: confirmation,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setMessage(response.data.message);
      navigate("/MemberPage");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="form-box-wrapper">
      <div className="form-box">
        <h1 class="title">Register with Bookify</h1>
        <form id="register_form" className="register-form" action="" method="">
          <div class="input-text">
            <div class="fl-name">
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Enter first name"
                value={fname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />{" "}
              <input
                type="text"
                id="lname"
                name="lname"
                placeholder="Enter last name"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />{" "}
            </div>
            <div className="input">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />{" "}
            </div> 
            <div className="input">
                <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />{" "}
            </div>
            <div className="input">
                <input
                type="password"
                id="confirmation"
                name="confirmation"
                placeholder="Confirm password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                required
                />{" "}
            </div>
          </div>
          {message && <p class="error-message">{message}</p>}
          <button class="small-btn" type="submit" onClick={handleRegister}>
            Sign Up
          </button>
         
        </form>
        <div>
            <p>
              Already have an account?{" "}
              <Link to="/Login">&nbsp;&nbsp;Login</Link>
            </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
