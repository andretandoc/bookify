import image from "../icons/Bookify.jpeg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({ isLoggedIn, onLogout }) {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", showNavbar);
    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [showNavbar]);

  const toggleNavbar = () => {
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
        <button
          className={`hamburger ${showNavbar ? "active" : ""}`}
          onClick={toggleNavbar}
        >
          &#9776;
        </button>
        <nav className={`navbar ${showNavbar ? "active" : ""}`}>
          {isLoggedIn ? (
            <>
              <div className="nav-item">
                <Link to="/MemberPage">Home</Link>
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
                <Link to="/CreateEvent">Create Event</Link>
              </div>
              <div className="nav-item">
                <Link to="/BookingURL">BookingURL-Test</Link>
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
            <>
              <div className="nav-item">
                <Link to="/">Home</Link>
              </div>
              <div className="nav-item">
                <Link to="/ApptForm">History</Link>
              </div>
              <div className="nav-item">
                <Link to="/PublicEvents">Events</Link>
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
      </header>
    </div>
  );
}

export default Header;
