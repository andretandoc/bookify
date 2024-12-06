import { useState } from "react";
import axios from "axios";

function ApptForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleAppt = async (event) => {
    event.preventDefault();

    // Reset results
    setAppointments([]);
    setMessage("");

    if (!firstName && !lastName && !email && !startDate && !endDate) {
      setMessage(
        "Please provide at least one filter to search for appointments."
      );
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          params: {
            firstName,
            lastName,
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
        // console.log("Appointments set:", response.data);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to retrieve appointments"
      );
    }
  };

  //   console.log("Appointments State:", appointments);

  return (
    <div className="appt-box">
      <h1 className="title">Appointment History</h1>
      <form onSubmit={handleAppt}>
        <div className="input-text">
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
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
        <button className="btn" type="submit">
          Get Appointments
        </button>
      </form>
      {message && <p className="error-message">{message}</p>}

      {appointments.length > 0 && (
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
        </div>
      )}
    </div>
  );
}

export default ApptForm;
