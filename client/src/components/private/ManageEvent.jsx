import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ManageEvent() {
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState({
    active: [],
    past: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    const fetchEvents = async () => {
      setEvents({ active: [], past: [] });
      setMessage("");

      try {
        const token = localStorage.getItem("token");
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_URL}/api/appointments/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data.activeEvents)

        if (
          response.data.activeEvents.length === 0 &&
          response.data.pastEvents.length === 0
        ) {
          setMessage("No events found");
        } else {
          setEvents({
            active: response.data.activeEvents || [],
            past: response.data.pastEvents || [],
          });
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to retrieve events!"
        );
      }
    };
    fetchEvents();
  }, []); // Empty dependency array ensures it runs once on component mount

  
  const openModal = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventId(null);
  };

  const confirmCancel = async () => {
    if (!selectedEventId) return;
  
    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;
  
      const response = await axios.delete(`${API_URL}/api/appointments/${selectedEventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Remove the canceled event from the state
      setEvents((prev) => ({
        ...prev,
        active: prev.active.filter((event) => event._id !== selectedEventId),
      }));
  
      setSuccessMessage("Event successfully canceled!"); // Add success message
    } catch (error) {
      console.error("Error canceling event:", error);
      setMessage(
        error.response?.data?.message || "Failed to cancel the event!"
      );
    } finally {
      closeModal();
    }
  };

  return (
    <main class="layout">
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
              View Public Events
            </Link>
          </li>

          <li>
            <Link to="/CustomMeeting" className="link">
              Custom Meeting
            </Link>
          </li>
        </ul>
      </aside>
      <div class="content-wrap">
        <div class="container">

          
          <h2>My Active Events:</h2>
          {events.active.length > 0 ? (
            <div class="table-wrapper">
              <ul class="responsive-table">
                <li class="table-header">
                  <div class="col">Name</div>
                  <div class="col">Date</div>
                  <div class="col">Time</div>
                  <div class="col">Location</div>
                  <div class="col">Privacy</div>
                  <div class="col">URL</div>
                  <div class="col"></div>
                </li>
                {events.active.map((event, index) => (
                  <li key={index} className="table-row">
                    <div className="col" data-label="Name">
                      {event.title || "N/A"}
                    </div>
                    <div className="col" data-label="Date">
                      {new Date(event.startDate).toLocaleString()}
                    </div>
                    <div className="col" data-label="From">
                      {event.startTime}
                    </div>
                    <div className="col" data-label="Location">
                      {event.location || "N/A"}
                    </div>
                    <div className="col" data-label="Privacy">
                      {event.privacy || "N/A"}
                    </div>
                    <div className="col" data-label="Public URL">
                    <button
                      onClick={() => {
                        if (event.publicURL) {
                          window.location.href = `http://localhost:5173/booking/${event.publicURL}`;

                        } else {
                          alert("No URL available");
                        }
                      }}
                    >
                      Go to URL
                    </button>
                  </div>
                  <div class="col">
                  <button
                        className="reject-btn"
                        onClick={() => openModal(event._id)}
                      >
                        Cancel Event &#10060;
                      </button>
                  </div>
                  </li>
                ))}
              </ul>

              
            </div>
          ) : (
            <div className="no-events">
              <button className="double-btn"> <Link to="/CreateEvent" className="link"> Create Events </Link></button>
              <p>{message}</p>
            </div>
          )}

        {successMessage && (
          <p className="success-message" style={{ color: "green", marginTop: "10px" }}>
            {successMessage}
          </p>
        )}
        </div>


        <div className="container">
          <h2>My Past Events:</h2>
          {events.past.length > 0 ? (
            <div className="table-wrapper">
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col">Name</div>
                  <div className="col">Date</div>
                  <div className="col">Time</div>
                  <div className="col">Location</div>
                  <div className="col">Recurring</div>
                  <div className="col">Privacy</div>

                </li>
                {events.past.map((event, index) => (
                  <li key={index} className="table-row">
                    <div className="col" data-label="Name">
                      {event.title || "N/A"}
                    </div>
                    <div className="col" data-label="Date">
                      {new Date(event.startDate).toLocaleString()}
                    </div>
                    <div className="col" data-label="From">
                      {event.startTime}
                    </div>
                    <div className="col" data-label="To">
                      {event.endTime}
                    </div>
                    <div className="col" data-label="Location">
                      {event.location || "N/A"}
                    </div>
                    <div className="col" data-label="Recurring">
                      {event.recurring || "N/A"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>{message}</p>
          )}
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Are you sure you want to cancel this event?</h3>
              <div className="modal-buttons">
                <button className="btn-confirm" onClick={confirmCancel}>
                  Yes
                </button>
                <button className="btn-cancel" onClick={closeModal}>
                  No
                </button>
              </div>
            </div>
          </div>
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


