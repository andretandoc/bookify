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
    try {
      const response = await axios.post("http://localhost:5000/api/...", {
        firstname,
        lastname,
        email,
        startdate,
        enddate,
      });
    } catch (error) {
      setMessage(error.response.data.message || "Appointments failed");
    }
  };

  return (
    <div class="appt-box">
      <h1 class="title">Appointment History</h1>
      <div class="input-text">
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
      <div class="input-date">
        <label for="start-date">Start Date:</label>{" "}
        <input
          type="date"
          id="start-date"
          name="start-date"
          required
          value={startdate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label for="end-date">End Date:</label>{" "}
        <input
          type="date"
          id="end-date"
          name="end-date"
          required
          value={enddate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button class="btn" type="submit" onClick={handleAppt()}>
        Get Appointments
      </button>
      {message && { message }}
    </div>
  );
}

export default ApptForm;
