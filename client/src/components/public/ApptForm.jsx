import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ApptForm() {
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState({
    active: [],
    past: [],
  });
  const navigate = useNavigate();

  const handleAppt = async (event) => {
    event.preventDefault();

    // Reset results
    setAppointments([]);
    setMessage("");

    if (!email) {
      setMessage("Please provide an email to search for appointments!");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(mcgill\.ca|mail\.mcgill\.ca)$/;
    if (emailRegex.test(email)) {
        setMessage("Mcgill members should login to access their history");
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API_URL}/api/appointments`, {
        params: {
          email,
          startDate,
          endDate,
        },
      });

      if (
        response.data.activeAppointments.length === 0 &&
        response.data.pastAppointments.length === 0
      ) {
        setMessage("No appointments found");
      } else {
        const newAppointments = {
          active: response.data.activeAppointments || [],
          past: response.data.pastAppointments || [],
        };
        setAppointments(newAppointments);
        console.log(newAppointments);
        navigate("/ApptList", { state: { appointments: newAppointments } });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to retrieve appointments!"
      );
    }
  };

  //   console.log("Appointments State:", appointments);
  return (
    <main className="layout">
      <div className="form-box">
        <h1 className="title">Appointment History</h1>
        <form className="appt_form" onSubmit={handleAppt}>
          <div className="input-text">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-date">
            <div className="from-day">
              <label htmlFor="start-date">Start Date:</label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="to-day">
              <label htmlFor="end-date">End Date:</label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button className="double-btn" type="submit">
            View History
          </button>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>

      <div className="footer">
        <footer>
          <p> &copy; 2024 Bookify! McGill University </p>
        </footer>
      </div>
    </main>
  );
}

export default ApptForm;
