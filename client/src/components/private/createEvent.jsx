import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("One-Time"); // Event Type: One-Time or Recurring
  const [recurrenceFrequency, setRecurrenceFrequency] = useState("Weekly"); // Weekly or Monthly
  const [startDate, setStartDate] = useState(""); // Start Date
  const [endDate, setEndDate] = useState(""); // End Date (for Recurring)
  const [location, setLocation] = useState(""); // Event Location
  const [privacy, setPrivacy] = useState(""); // Public or Members-Only
  const [baseTimeslots, setBaseTimeslots] = useState([]); // Array of base time slots
  const [error, setError] = useState(""); // Error Message
  const [successMessage, setSuccessMessage] = useState(""); // Success Message
  const [publicURL, setPublicURL] = useState(""); // Generated Public URL

  // Add new base time slot
  const addBaseTimeSlot = () => {
    setBaseTimeslots([...baseTimeslots, ""]);
  };

  // Handle base time slot change
  const handleBaseTimeChange = (index, value) => {
    const updatedTimes = [...baseTimeslots];
    updatedTimes[index] = value;
    setBaseTimeslots(updatedTimes);
  };

  // Remove a specific base time slot
  const handleRemoveBaseTime = (index) => {
    setBaseTimeslots(baseTimeslots.filter((_, i) => i !== index));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validate all required fields
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
        timeslots: baseTimeslots, // Send plain times ["06:40"]
      };

      console.log("Sending payload:", payload);

      const response = await axios.post(
        "http://localhost:5005/api/appointments/create",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Success response
      setSuccessMessage("Event created successfully! Share this URL:");
      setPublicURL(response.data.publicURL);

      // Reset form fields
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

      <div className="container glass-container">
        <h2 className="title">Create an Event</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="input-text">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Location */}
          <div className="input-text">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., Online or Room 101)"
              required
            />
          </div>

          {/* Type */}
          <div className="choose-privacy">
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="One-Time">One-Time</option>
              <option value="Recurring">Recurring</option>
            </select>
          </div>

          {/* Show Start Date for One-Time */}
          <div className="choose-date">
            <label>{type === "Recurring" ? "Start:" : "Date:"}</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* Show End Date and Recurrence for Recurring Events */}
          {type === "Recurring" && (
            <>
              <div className="choose-date">
                <label>Until:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              <div className="choose-privacy">
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
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBaseTime(index)}
                  className="small-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBaseTimeSlot}
              className="small-btn"
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
                target="_blank"
                rel="noopener noreferrer"
              >
                View Event Link
              </a>
            </p>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn">
            Create Event
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateEvent;
