import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CustomMeeting = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [proposedTimes, setProposedTimes] = useState([]);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(""); // Host Name Field
  const [location, setLocation] = useState(""); // Location Field
  const navigate = useNavigate();

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Sending Custom Meeting Request...");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve JWT token
    if (!token) {
      alert("You must be logged in to send a meeting request!");
      return;
    }

    // Convert proposedTimes to full Date objects
    const fullProposedTimes = proposedTimes.map((time) => {
      const [hours, minutes] = time.split(":"); // Extract hours and minutes
      const meetingDate = new Date(date); // Clone the date
      meetingDate.setHours(hours, minutes, 0, 0); // Add time to the date
      return meetingDate;
    });

    const customMeetingData = {
      recipientEmail,
      proposedTimes: fullProposedTimes, // Use full Date objects
      message,
      date, // Ensure date is "YYYY-MM-DD"
      location,
    };

    try {
      const response = await axios.post(
        "http://localhost:5005/api/custom-meetings",
        customMeetingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Custom meeting request sent successfully!");
      alert(`Meeting ID: ${response.data.meeting._id}`);
      setRecipientEmail("");
      setProposedTimes([]);
      setMessage("");
      setDate("");
      setLocation("");
      navigate("/ManageBooking"); // Redirect to manage bookings
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to create meeting. Please try again."
      );
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
            <label className="event-label" htmlFor="start-date">
              Date:
            </label>
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
            <button
              type="button"
              onClick={addProposedTime}
              className="small-btn"
            >
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

      <div className="footer">
        <footer>
          <p> &copy; 2024 Bookify! McGill University </p>
        </footer>
      </div>
    </main>
  );
};

export default CustomMeeting;
