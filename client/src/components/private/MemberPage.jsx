import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MemberPage = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setAppointments([]); // Reset state before fetching
      setMessage("");

      const token = localStorage.getItem("token");
      console.log("Token in Frontend:", token); // Debugging

      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(
          `${API_URL}/api/appointments/private`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data);

        setName(response.data.name || "NA"); // Set user's name

        if (response.data.activeAppointments.length === 0) {
          setMessage("No upcoming appointments found");
        } else {
          setAppointments(response.data.activeAppointments);
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to retrieve appointments!"
        );
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="menu">
          <li>
            <Link to="/MemberPage" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/CreateEvent" className="link">
              Create Events
            </Link>
          </li>
          <li>
            <Link to="/ManageEvent" className="link">
              Manage Events
            </Link>
          </li>
          <li>
            <Link to="/ManageBooking" className="link">
              Manage Meetings
            </Link>
          </li>
          <li>
            <Link to="/FullEvents" className="link">
              View All Events
            </Link>
          </li>
          <li>
            <Link to="/CustomMeeting" className="link">
              Custom Meeting
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <section
        className="container"
        style={{
          boxShadow: "none",
          backgroundColor: "white",
          marginLeft: "100px",
          width: "max-content",
        }}
      >
        <h1>Hey {name}!</h1>
        <h2>Your upcoming meetings:</h2>
        <div>
          {/* Show a message if there are no active appointments */}
          {appointments.length === 0 ? (
            <p>{message || "No active appointments."}</p>
          ) : (
            // Render only the first 4 active appointments
            appointments.slice(0, 4).map((appointment, index) => (
              <div key={index} className="event-card">
                <div>
                  <h className="event-title">
                    Event : {appointment.eventId?.title || "N/A"}
                  </h>
                  <p>
                    <strong>Hosted by:</strong>{" "}
                    {appointment.eventId?.createdBy || "N/A"}
                  </p>
                  <p>
                    <strong>When:</strong>{" "}
                    {appointment.eventId?.startDate
                      ? new Date(appointment.eventId.startDate).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Where:</strong>{" "}
                    {appointment.eventId?.location || "N/A"}
                  </p>
                </div>
                <Link to="/ManageBooking" className="double-btn link">
                  Manage
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="footer">
        <footer>
          <p>&copy; 2024 Bookify! McGill University</p>
        </footer>
      </div>
    </div>
  );
};

export default MemberPage;
