import { useState } from "react";
import axios from "axios";

function ApptForm() {
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState("form"); // Tracks the current view (form or list)

  const handleAppt = async (event) => {
    event.preventDefault();

    // Reset results
    setAppointments([]);
    setMessage("");

    if (!email) {
      setMessage(
        "Please provide an email to search for appointments!"
      );
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          params: {
            email,
            startDate,
            endDate,
          },
        }
      );

      // console.log("API Response:", response.data);

      if (response.data.length === 0) {
        setMessage("No appointments found");
      } else {
        setAppointments(response.data.appointments); // Save appointments in state
        setView("list"); // Switch to the list view
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to retrieve appointments!"
      );
    }
  };

  const handleGoBack = () => {
    setView("form"); // Switch back to the form view
    setAppointments([]); // Reset appointments
  };

  //   console.log("Appointments State:", appointments);

  return (
    <main className="form-box-wrapper">
      <div className="form-box">
      <h1 className="title">Appointment History</h1>
      {view === "form" && (
        <form onSubmit={handleAppt}>
        <div className="input-text">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
        </div>
        <div className="input-date">
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            name="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label htmlFor="end-date">End Date:</label>
          <input
            type="date"
            id="end-date"
            name="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="small-btn" type="submit">
          View History
        </button>
        {message && <p className="error-message">{message}</p>}
      </form>
      )}
      

      {view === "list" && appointments.length > 0 && (
        <div className="appointments-list">
          <h2>Appointments:</h2>
          {appointments.map((appointment, index) => (
            <div key={appointment._id || index} className="appointment">
              <h3>Appointment {index + 1}</h3>
              <p>
                <strong>First Name:</strong> {appointment.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {appointment.lastName}
              </p>
              <p>
                <strong>Email:</strong> {appointment.email}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(appointment.startDate).toLocaleString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(appointment.endDate).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {appointment.status}
              </p>
              <hr />
            </div>
          ))}
            <button className="btn" onClick={handleGoBack}> Go Back </button>
        </div>
      )}
    </div>
    </main>
  );
}

export default ApptForm;