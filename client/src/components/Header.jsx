import image from "../icons/Bookify.jpeg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
    const [showNavbar, setShowNavbar] = useState(false);
    const [view, setView] = useState("form"); // Tracks the current view (public or private)
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks user's authentication status
    
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    useEffect(() => {
        // Replace with your actual authentication logic
        const userLoggedIn = Boolean(localStorage.getItem("authToken"));
        setIsAuthenticated(userLoggedIn);
    }, []);

    return (
        <div className="header">
        <header>
          <div className="logo">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={image} alt="Logo" />
            </Link>
            <span className="tool-name">&nbsp;&nbsp;Bookify</span>
          </div>
          <nav className={`navbar ${showNavbar ? "active" : ""}`}>
            {isAuthenticated ? (
              // Private Header Links
              <>
                <div className="nav-item">
                  <Link to="/">Home</Link>
                </div>
                <div className="nav-item">
                  <Link to="/">Online Meeting</Link>
                </div>
                <div className="nav-item">
                  <Link to="/">Book Meeting</Link>
                </div>
                <div className="nav-item">
                  <Link to="/">Custom Meeting</Link>
                </div>
                <div className="nav-item">
                  <Link to="/">Create Meeting</Link>
                </div>
                <div className="nav-item">
                  <Link to="/">Manage Meeting</Link>
                </div>
                <div className="nav-item">
                  <Link to="/">Log Out</Link>
                </div>
              </>
            ) : (
              // Public Header Links
              <>
                <div className="nav-item">
                  <Link to="/">Home</Link>
                </div>
                <div className="nav-item">
                  <Link to="/ApptForm">History</Link>
                </div>
                <div className="nav-item">
                  <Link to="/Login">Login</Link>
                </div>
                <div className="nav-item">
                  <Link to="/Register">Register</Link>
                </div>
              </>
            )}
          </nav>
          <button className="hamburger" onClick={handleShowNavbar}>
            &#9776;
          </button>
        </header>
      </div>
        )
    }

export default Header;
