import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FullEvents() {
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState({
    active: [],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents({ active: [] }); // Ensure proper default structure
      setMessage("");

      const token = localStorage.getItem("token");
      console.log("Token in Frontend:", token); // Debugging

      try {
        // Assuming `API_URL` holds the URL to the backend server
        const API_URL = import.meta.env.VITE_API_URL;

        // Update this to fetch all events
        const response = await axios.get(`${API_URL}/api/appointments/allevents`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if no events found
        if (response.data.allEvents.length === 0) {
          setMessage("No events found");
        } else {
          setEvents({
            active: response.data.allEvents || [],
          });
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to retrieve events!"
        );
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="layout">
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

      <div className="container"style={{marginLeft: "100px"}}>
        <h2>All Events at McGill:</h2>
        {events.active.length > 0 ? (
          <div className="table-wrapper" style={{minHeight:"500px"}}>
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col">Event</div>
                <div className="col">Host</div>
                <div className="col">Date</div>
                <div className="col">From</div>
                <div className="col">To</div>
                <div className="col">Location</div>
                <div className="col"></div>
              </li>

              {events.active.map((event, index) => (
                <li key={index} className="table-row">
                  <div className="col" data-label="Event">
                    {event.title || "N/A"}
                  </div>
                  <div className="col" data-label="Host">
                    {event.createdBy || "N/A"}
                  </div>
                  <div className="col" data-label="Date & Time">
                    {new Date(event.startDate).toLocaleString()}
                  </div>
                  <div className="col" data-label="Location">
                    {event.location || "N/A"}
                  </div>
                  <div className="col" data-label="URL">
                    <button
                      className="double-btn"
                      onClick={() => {
                        if (event.publicURL) {
                          window.location.href = `https://bookify-ten-beige.vercel.app/booking/${event.publicURL}`;
                        } else {
                          alert("No URL available");
                        }
                      }}
                    >
                      Go to Event
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>

      <div className="footer">
        <footer>
          <p> &copy; 2024 Bookify! McGill University </p>
        </footer>
      </div>
    </main>
  );
}
