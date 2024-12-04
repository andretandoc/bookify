import React from 'react';
import './public_style.css'; // Importing the external CSS file

const AppointmentHistory = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const appointments = [
      'Meeting with Dr. Smith on 2023-12-01',
      'Checkup on 2023-12-15',
      'Consultation on 2024-01-10',
    ];
    document.getElementById('form').innerHTML = `
      <h1>Your Appointments:</h1>
      <ul>
        ${appointments.map(appointment => `<li>${appointment}</li>`).join('')}
      </ul>
      <button class="go-back" id="goBackButton">Go Back</button>
    `;
    const goBackButton = document.getElementById('goBackButton');
    goBackButton.addEventListener('click', function () {
      window.location.reload();
    });
  };

  return (
    <div className="site">
      <header>
        <div className="logo">
          <img src="client/src/Bookify.jpeg" alt="Logo" />
          <span className="tool-name">Bookify</span>
        </div>
        <nav>
          <a href="#home">History</a>
          <a href="#about">Bookings</a>
          <a href="#services">Sign In</a>
          <i className="fa-solid fa-user profile-icon"></i>
        </nav>
      </header>

      <div className="form" id="form">
        <h1 className="title">Appointment History</h1>
        <form id="appointmentForm" onSubmit={handleSubmit}>
          <div className="input-text">
            <label htmlFor="fname">First name:</label>
            <input type="text" id="fname" name="fname" placeholder="Enter first name" />
            <br />
            <label htmlFor="lname">Last name:</label>
            <input type="text" id="lname" name="lname" placeholder="Enter last name" />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" placeholder="Enter email" />
            <br />
          </div>
          <div className="input-date">
            <label htmlFor="start-date">Start Date:</label>
            <input type="date" id="start-date" name="start-date" />
            <label htmlFor="end-date">End Date:</label>
            <input type="date" id="end-date" name="end-date" />
          </div>

          <button type="submit">Get Appointments</button>
        </form>
      </div>

      <footer>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#help">Help</a>
        <a href="#contact">Contact Us</a>
      </footer>
    </div>
  );
};

export default AppointmentHistory;