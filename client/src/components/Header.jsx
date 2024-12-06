import image from '../Bookify.jpeg'
import { Link } from 'react-router-dom';
import { useState } from 'react'

function Header() {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    return (
        <div class="header">
            <header>
                <div class = "logo">
                    <img src={image} alt = "Logo"></img>
                    <span class = "tool-name">&nbsp;&nbsp;Bookify</span>
                </div>
                <nav className={`navbar  ${showNavbar ? 'active' : ''}`}>
                    <div className="nav-item"><Link to="/App">Home</Link></div>
                    <div className="nav-item"><Link to="/ApptForm">Get History</Link></div>
                    <div className="nav-item"><Link to="/BookingForm">Book Meeting</Link></div>
                    <div className="nav-item"><Link to="/LoginForm">Login</Link></div>
                    <div className="nav-item"><Link to="/RegisterForm">Register</Link></div>
                </nav>
                <button className="hamburger" onClick={handleShowNavbar}>&#9776;</button>
            </header>
        </div>
    );
}

export default Header