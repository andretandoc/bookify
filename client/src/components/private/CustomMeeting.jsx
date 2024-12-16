import { useState } from "react";
import { Link } from "react-router-dom";

const CustomMeeting = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [proposedTimes, setProposedTimes] = useState([]);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(""); // Host Name Field
  const [location, setLocation] = useState(""); // Location Field

  const addProposedTime = () => {
    setProposedTimes([...proposedTimes, ""]);
  };

  const handleProposedTimeChange = (index, value) => {
    const updatedTimes = [...proposedTimes];
    updatedTimes[index] = value;
    setProposedTimes(updatedTimes);
  };

  const handleRemoveTime = (index) => {
    const updatedTimes = proposedTimes.filter((_, i) => i !== index);
    setProposedTimes(updatedTimes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending Custom Meeting Request...");
  };

  return (
    <main class="layout">
        <aside className = "sidebar">
          <ul className = "menu">
            <li>
                <Link to = "/MemberPage" className = "link">
                  Home
                </Link>
              </li>

              <li>
                <Link to = "/CreateEvent" className = "link">
                  Create Events
                </Link>
              </li>
              <li>
                <Link to = "/ManageEvent" className = "link">
                  Manage Events
                </Link>
              </li>
              <li>
                <Link to = "/ManageBooking" className = "link">
                  Manage Meetings
                </Link>
              </li>
              <li>
                <Link to = "/FullEvents" className = "link">
                  Book an Appointment
                </Link>
              </li>

              <li>
                <Link to = "/CustomMeeting" className = "link">
                  Custom Meeting
                </Link>
              </li>
                
              <li>
                <Link to = "/URLTest" className = "link">
                BookingURL-Test
                </Link>
              </li>
          </ul>
        </aside>
      <div className="container">
        <h2>Send a Custom Meeting Request</h2>
        <form onSubmit={handleSubmit}>
          {/* Recipient Email */}
          <div className="input-text">
            <label htmlFor="recipientEmail">Recipient Email:</label>
            <input
              type="email"
              id="recipientEmail"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Enter recipient's email"
              required
              className="booking-input"
            />
          </div>

          <div className="input-text">
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., Online or Room 101)"
              required
              className="booking-input"
            />
          </div>

          {/* Date */}
          <div className="choose-date">
            <label className="event-label" htmlFor="start-date">Date:</label>
            <input
                type="date"
                id="start-date"
                name="start-date"
                className="date-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
        </div>

          {/* Proposed Times */}
          <div className="input-text">
            <label>Proposed Times:</label>
            {proposedTimes.map((time, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    handleProposedTimeChange(index, e.target.value)
                  }
                  required
                  className="booking-input"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTime(index)}
                  className="small-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addProposedTime} className="small-btn">
              Add Another Time
            </button>
          </div>

          {/* Message */}
          <div className="input-text">
            <label htmlFor="message">Message (optional):</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter additional details (optional)"
              rows="4"
              className="booking-input"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn">
            Send Request
          </button>
        </form>
      </div>
    </main>

  );
};

export default CustomMeeting;
