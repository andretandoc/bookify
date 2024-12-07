import React from 'react';
import "./public_style.css"; 

// Small Button Component
const SmallBtn = ({ text }) => {
  return <button className="small-btn">{text}</button>;
};

// Double Red Button Component
const DoubleRedBtn = ({ text }) => {
  return <button className="double-red-btn">{text}</button>;
};

// Logo Component
const Logo = () => {
  return (
    <div className="logo">
      <img src="./src/Bookify.jpeg" alt="Logo" />
      <span className="tool-name">Bookify</span>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <header>
      <Logo />
      <nav>
        <div className="hover-effect">
          <a href="app_history.html">View History</a>
        </div>
        <div className="hover-effect">
          <a href="#services">Sign Up</a>
        </div>
        <i className="fa-solid fa-user profile-icon"></i>
      </nav>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer>
      <a href="#privacy">Privacy Policy</a>
      <a href="#terms">Terms of Service</a>
      <a href="#help">Help</a>
      <a href="#contact">Contact Us</a>
    </footer>
  );
};

// Main App Component
const Landing = () => {
  return (
    <div>
      <Header />
      <div
        className="content-wrapper"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '80px',
          alignItems: 'center'
        }}
      >
        <div
          className="left-section"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '50px',
            textAlign: 'left',
            marginLeft: '10%',
            fontFamily: 'Lato',
            fontSize: '20px',
            zIndex: '2'
          }}
        >
          <h1>
            Simplifying <br />
            Academic Scheduling <br />
            & Meetings
          </h1>
          <p
            style={{
              fontFamily: 'Lato',
              fontSize: '20px',
              fontWeight: 300,
            }}
          >
            Take control of your academic journey—effortlessly schedule meetings and connect with the McGill community. Manage your appointments with confidence and stay focused on achieving your goals.
          </p>
          <SmallBtn text="Sign In" />
        </div>

        <div
          className="right-section"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          <DoubleRedBtn text="Schedule Appointment with a McGill Professor" />
          <DoubleRedBtn text="Manage Scheduled and Completed Appointments" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
