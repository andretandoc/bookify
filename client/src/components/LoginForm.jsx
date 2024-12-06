import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    
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
        <main>
             <div class="glass-container">
                <h1 class="title">Login</h1>
                <form id="login_form" action="" method=""> 
                    <div class="input-text">
                        <input type="text" id="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br/>
                        <input type="password" id="password" name="password" placeholder="Enter password"  value={password} onChange={(e) => setPassword(e.target.value)} required /> <br/>
                    </div>
                    <div class="options">
                        <input type="checkbox" id="remember" name="remember"/> <label for="remember">Remember me</label> <a class="forgot" href="#">Forgot Password?</a>
                    </div>
                    <button class="btn" type="submit" onClick={handleLogin}>Log In</button>
                    {message && <p>{message}</p>}
                    <div><p>Don't have an account? <Link to="/RegisterForm">&nbsp;Register</Link></p></div>
                </form>
            </div>
        </main>
       
    )
}

export default LoginForm





