import image from "../icons/Bookify.jpeg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({ isLoggedIn, onLogout }) {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

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
          {isLoggedIn ? (
            // Private Header Links
            <>
              <div className="nav-item">
                <Link to="/MemberPage">Home</Link>
              </div>
              <div className="nav-item">
                <Link to="/CreateBooking">Create Meeting</Link>
              </div>
              <div className="nav-item">
                <Link to="/CustomMeeting">Custom Meeting</Link>
              </div>
              <div className="nav-item">
                <Link to="/ManageBooking">Manage Meeting</Link>
              </div>
              <div className="nav-item">
                <Link to="/ManageEvent">Manage Event</Link>
              </div>
              <div className="nav-item">
                <button
                  onClick={onLogout}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "inherit",
                  }}
                >
                  Log Out
                </button>
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
  );
}

export default Header;