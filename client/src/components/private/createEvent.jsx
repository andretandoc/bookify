// Andre Tandoc 

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("One-Time"); 
  const [recurrenceFrequency, setRecurrenceFrequency] = useState("Weekly"); 
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const [location, setLocation] = useState(""); 
  const [privacy, setPrivacy] = useState(""); 
  const [baseTimeslots, setBaseTimeslots] = useState([]); 
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [publicURL, setPublicURL] = useState(""); 

  const addBaseTimeSlot = () => {
    setBaseTimeslots([...baseTimeslots, ""]);
  };

  const handleBaseTimeChange = (index, value) => {
    const updatedTimes = [...baseTimeslots];
    updatedTimes[index] = value;
    setBaseTimeslots(updatedTimes);
  };

  const handleRemoveBaseTime = (index) => {
    setBaseTimeslots(baseTimeslots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (
      !title ||
      !location ||
      !privacy ||
      !startDate ||
      baseTimeslots.length === 0
    ) {
      setError("Please fill out all fields and add at least one time slot.");
      return;
    }

    const today = new Date().toISOString().split("T")[0]; 
    if (startDate < today) {
      setError("The event start date cannot be before today.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Create the event payload
      const payload = {
        title,
        type,
        location,
        privacy,
        startDate,
        endDate: type === "Recurring" ? endDate : startDate,
        recurrence: type === "Recurring" ? recurrenceFrequency : null,
        timeslots: baseTimeslots,
      };

      console.log("Sending payload:", payload);
      console.log("API URL:", import.meta.env.VITE_API_URL);
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${API_URL}/api/appointments/create`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("Event created successfully! Share this URL:");
      setPublicURL(response.data.publicURL);

      setTitle("");
      setType("One-Time");
      setLocation("");
      setPrivacy("");
      setStartDate("");
      setEndDate("");
      setBaseTimeslots([]);
    } catch (error) {
      console.error("Error:", error.message);
      setError(
        error.response?.data?.message ||
          "Failed to create the event. Please try again."
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

      <div className="container" style={{marginLeft: "10%"}}>
        <h2 className="title" style={{marginBottom:"0.5em", marginTop:"0.5em"}}>Create an Event</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="input-text"style={{marginBottom:"10px"}}>
          <label style={{marginBottom:"-2px"}}>Event Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Location */}
          <div className="input-text"style={{marginBottom: "2rem"}}>
          <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., Online or Room 101)"
              required
            />
          </div>

          {/* Type */}
          <div className="choose-privacy"style={{marginBottom: "2rem"}}>
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)} style={{borderRadius:"10px", width:"150px", marginLeft:"10px"}}>
              <option value="One-Time">One-Time</option>
              <option value="Recurring">Recurring</option>
            </select>
          </div>

          {/* Show Start Date for One-Time */}
          <div className="choose-date"style={{marginBottom: "2rem"}}>
            <label>{type === "Recurring" ? "Start:" : "Date:"}</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              style={{borderRadius:"10px", width:"150px", marginLeft:"3px", height:"24px"}}
            />
          </div>

          {/* Show End Date and Recurrence for Recurring Events */}
          {type === "Recurring" && (
            <>
              <div className="choose-date"style={{marginBottom: "2rem"}}>
                <label>Until:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  style={{borderRadius:"10px", width:"150px", marginLeft:"3px", height:"24px"}}
                />
              </div>

              <div className="choose-privacy"style={{marginBottom: "2rem"}}>
                <label>Recurrence:</label>
                <select
                  value={recurrenceFrequency}
                  onChange={(e) => setRecurrenceFrequency(e.target.value)}
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </>
          )}

          {/* Privacy */}
          <div className="choose-privacy">
            <label>Event Privacy:</label>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              required
              style={{borderRadius:"10px", width:"150px", marginLeft:"10px"}}
            >
              <option value="" disabled>
                Select Privacy
              </option>
              <option value="Public">Open to Everyone</option>
              <option value="Members-Only">Members Only</option>
            </select>
          </div>

          {/* Time Slots */}
          <div className="input-text">
            <label>Time slots:</label>
            {baseTimeslots.map((time, index) => (
              <div key={index} style={{ display: "flex", gap: "10px" }}>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => handleBaseTimeChange(index, e.target.value)}
                  required
                  style={{borderRadius:"10px", width:"150px", marginLeft:"3px", height:"24px"}}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBaseTime(index)}
                  className="double-btn"
                  style={{
                    fontSize: "12px",
                    width: "80px",
                    height:"24px",
                    lineHeight:"24px",
                    background:"grey",
                    boxShadow: "-5px -5px 1px #1234"
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBaseTimeSlot}
              className="double-btn"
            >
              Add Time
            </button>
          </div>

          {/* Messages */}
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">
              {successMessage}
              <br />
              <a
                href={`/booking/${publicURL}`}
                rel="noopener noreferrer"
                target="_self"
              >
                View Event Link
              </a>
            </p>
          )}

          {/* Submit Button */}
          <button type="submit" className="create-evnt-btn">
            Create Event
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

export default CreateEvent;
