import { useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";

function ApptForm() {
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

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
        "http://localhost:5005/api/appointments",
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
        navigate("/ApptList", { state: { appointments: response.data.appointments } });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to retrieve appointments!"
      );
    }
  };

  //   console.log("Appointments State:", appointments);
  return (
    <main className = "form-box-wrapper">
        <div className = "form-box">
          <h1 className = "title">Appointment History</h1>
            <form className = "appt_form" onSubmit={handleAppt}>
              <div className = "input-text">
                <input
                  type = "text"
                  id = "email"
                  name = "email"
                  placeholder = "Enter email"
                  value = {email}
                  onChange = {(e) => setEmail(e.target.value)}
                />
              </div>
              <div className = "input-date">
                <div className = "from-day">
                  <label htmlFor = "start-date">Start Date:</label>
                  <input
                    type = "date"
                    id = "start-date"
                    name = "start-date"
                    value = {startDate}
                    onChange = {(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className = "to-day">
                  <label htmlFor = "end-date">End Date:</label>
                  <input
                    type = "date"
                    id = "end-date"
                    name = "end-date"
                    value = {endDate}
                    onChange = {(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <button className = "double-btn" type = "submit">View History</button>
            </form>
            {message && <p className = "error-message">{message}</p>}
        </div>
      </main>
  );

}

export default ApptForm;