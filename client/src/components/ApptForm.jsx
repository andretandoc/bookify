import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ApptForm() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleAppt = async () => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          firstname,
          lastname,
          email,
          startdate,
          enddate,
        }
      );
      setMessage(
        response.data.message || "Appointments retrieved successfully"
      );
    } catch (error) {
      setMessage(error.response?.data?.message || "Appointments failed");
    }
  };

  return (
    <div className="appt-box">
      <h1 className="title">Appointment History</h1>
      <div className="input-text">
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Enter first name"
          required
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          id="lname"
          name="lname"
          placeholder="Enter last name"
          required
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />{" "}
        <br />
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
      </div>
      <div className="input-date">
        <label htmlFor="start-date">Start Date:</label>{" "}
        <input
          type="date"
          id="start-date"
          name="start-date"
          required
          value={startdate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="end-date">End Date:</label>{" "}
        <input
          type="date"
          id="end-date"
          name="end-date"
          required
          value={enddate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button className="btn" type="submit" onClick={handleAppt}>
        Get Appointments
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ApptForm;
