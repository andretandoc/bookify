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
      setFeedbackMessage("You must be logged in to send a meeting request!");
      return;
    }
  
    if (proposedTimes.length === 0) {
      setFeedbackMessage("Please add at least one proposed time.");
      return;
    }
  
    const proposedTimeStrings = proposedTimes.map((time) => time); 
    
    const fullProposedTimes = proposedTimes.map((time) => {
      const [hours, minutes] = time.split(":");
      const meetingDate = new Date(date); 
      meetingDate.setHours(hours, minutes, 0, 0); 
      return meetingDate.toISOString();
    });

    console.log("Time", proposedTimes)
  
    const customMeetingData = {
      recipientEmail,
      proposedTimes: proposedTimeStrings,
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
        `Invite sent successfully to ${recipientEmail}. Meeting ID: ${response.data.meeting._id}`
      );
  
      setRecipientEmail("");
      setProposedTimes([]);
      setMessage("");
      setDate("");
      setLocation("");
    } catch (error) {
      setFeedbackMessage(
        error.response?.data?.message ||
          "Failed to create meeting. Please try again."
      );
    }
  };
  

  return (
    <main className="layout">
      <aside className="sidebar" style={{height:"130vh"}}>
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
      <div className = "container"style={{marginLeft: "100px"}}>
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
              style={{borderRadius:"10px", width:"150px", marginLeft:"3px", height:"24px"}}
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
                  className="input-form"
                  style={{borderRadius:"10px", width:"150px", marginLeft:"3px", height:"24px"}}
                />
                <button type="button" className = "double-btn" style={{
                    fontSize: "12px",
                    width: "80px",
                    height:"24px",
                    lineHeight:"24px",
                    background:"grey",
                    boxShadow: "-5px -5px 1px #1234"
                  }} onClick={() => handleRemoveTime(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className = "double-btn" onClick={addProposedTime}>
              Add Another
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

          <button type = "double-btn" className = "create-evnt-btn" onClick={handleSubmit}>
            Send Request
          </button>

          {feedbackMessage && (
            <p
              className={`error-message ${
                feedbackMessage.includes("Failed") ? "error" : "success"
              }`}
            >
              {feedbackMessage}
            </p>
          )}
        </form>
      </div>

      <div className = "footer">
        <footer>
          <p> &copy; 2024 Bookify! McGill University </p>
        </footer>
      </div>
    </main>
  );
};

export default CustomMeeting;
