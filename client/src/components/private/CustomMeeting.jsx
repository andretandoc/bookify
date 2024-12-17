import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CustomMeeting = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [proposedTimes, setProposedTimes] = useState([]);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to send a meeting request!");
      return;
    }

    if (proposedTimes.length === 0) {
      setFeedbackMessage("Please add at least one proposed time.");
      return;
    }

    const fullProposedTimes = proposedTimes.map((time) => {
      const [hours, minutes] = time.split(":");
      const meetingDate = new Date(date);
      meetingDate.setHours(hours, minutes, 0, 0);
      return meetingDate;
    });

    const customMeetingData = {
      recipientEmail,
      proposedTimes: fullProposedTimes,
      message,
      date,
      location,
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${API_URL}/api/custom-meetings`,
        customMeetingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedbackMessage(
        `Custom meeting created successfully! Meeting ID: ${response.data.meeting._id}`
      );
      setRecipientEmail("");
      setProposedTimes([]);
      setMessage("");
      setDate("");
      setLocation("");
      navigate("/ManageBooking");
    } catch (error) {
      setFeedbackMessage(
        error.response?.data?.message ||
          "Failed to create meeting. Please try again."
      );
    }
  };

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

        {/* Feedback Message */}
        {feedbackMessage && (
          <p
            className={`feedback-message ${
              feedbackMessage.includes("Failed") ? "error" : "success"
            }`}
          >
            {feedbackMessage}
          </p>
        )}

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

          {/* Location */}
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
            <label htmlFor="start-date">Date:</label>
            <input
              type="date"
              id="start-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Proposed Times */}
          <div className="input-text">
            <label>Proposed Times:</label>
            {proposedTimes.map((time, index) => (
              <div key={index} style={{ display: "flex", gap: "10px" }}>
                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    handleProposedTimeChange(index, e.target.value)
                  }
                  required
                  className="booking-input"
                />
                <button type="button" onClick={() => handleRemoveTime(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addProposedTime}>
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

          {/* Feedback Message - Displayed Below Submit Button */}
          {feedbackMessage && (
            <p
              className={`feedback-message ${
                feedbackMessage.includes("Failed") ? "error" : "success"
              }`}
            >
              {feedbackMessage}
            </p>
          )}
        </form>
      </div>
    </main>
  );
};

export default CustomMeeting;
