import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ManageEvent() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState({
    active: [],
    past: [],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      setEvents({ active: [], past: [] });
      setMessage("");

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5005/api/appointments/events",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (
          response.data.activeEvents.length === 0 &&
          response.data.pastEvents.length === 0
        ) {
          setMessage("No appointments found");
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const openModal = (meetingId) => {
    setSelectedMeeting(meetingId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
  };

  const confirmCancel = () => {
    console.log(`Meeting ${selectedMeeting} cancelled`);
    closeModal();
  };

  const handleEventChange = (e) => {
    setSelectedMeeting(e.target.value);
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
              Book an Appointment
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
                  <div class="col">From</div>
                  <div class="col">To</div>
                  <div class="col">Location</div>
                  <div class="col">Recurring</div>
                  <div class="col">Privacy</div>
                </li>
                {events.active.map((event, index) => (
                  <li key={index} className="table-row">
                    <div className="col" data-label="Name">
                      {event.name || "N/A"}
                    </div>
                    <div className="col" data-label="Date">
                      {new Date(event.date).toLocaleString()}
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
                    <div className="col" data-label="Privacy">
                      {event.privacy || "N/A"}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cancel-form-box">
                <form className="cancel-form">
                  <div className="select-event">
                    <p>Select event to cancel:</p>
                    <select
                      className="dropdown-event"
                      name="event"
                      onChange={handleEventChange} // Update state on selection
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {events.active.map((event, index) => (
                        <option key={index} value={event.name}>
                          {event.name || "N/A"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="cancel-from">
                    <label htmlFor="start-date">From:</label>
                    <input
                      type="date"
                      id="start-date"
                      name="start-date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div className="cancel-to">
                    <label htmlFor="end-date">To:</label>
                    <input
                      type="date"
                      id="end-date"
                      name="end-date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </form>
                <div class="col">
                  <button className="reject-btn" onClick={() => openModal(10)}>
                    Cancel Event &#10060;
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>{message}</p>
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
                  <div className="col">From</div>
                  <div className="col">To</div>
                  <div className="col">Location</div>
                  <div className="col">Recurring</div>
                </li>
                {events.past.map((event, index) => (
                  <li key={index} className="table-row">
                    <div className="col" data-label="Name">
                      {event.name || "N/A"}
                    </div>
                    <div className="col" data-label="Date">
                      {new Date(event.date).toLocaleString()}
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
              <h3>Are you sure you want to cancel this meeting?</h3>
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
