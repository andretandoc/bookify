import { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("One-Time");
  const [date, setDate] = useState(""); // Host Name Field
  const [location, setLocation] = useState(""); // Location Field
  const [timeslots, setTimeSlots] = useState([]);
  const [privacy, setPrivacy] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [publicURL, setPublicURL] = useState("");

  // Add new proposed time
  const addProposedTime = () => {
    setTimeSlots([...timeslots, ""]);
  };

  // Handle changes for proposed time inputs
  const handleProposedTimeChange = (index, value) => {
    const updatedTimes = [...timeslots];
    updatedTimes[index] = value;
    setTimeSlots(updatedTimes);
  };

  // Remove a specific proposed time
  const handleRemoveTime = (index) => {
    setTimeSlots(timeslots.filter((_, i) => i !== index));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccessMessage("");

    // Validation: Ensure all required fields are filled
    if (!title || !date || !location || timeslots.length === 0) {
      setError(
        "Please fill out all required fields and add at least one proposed time."
      );
      return;
    }

    const userEmail = req.user?.email; // Assuming req.user is populated by authentication middleware
    const userName = req.user?.name;

    try {
      const response = await axios.post(
        "/api/appointments/create",
        {
          event: title,
          date: date, // Dynamic Host Name
          location: location, // Dynamic Location
          timeslots, // Array of proposed time slots
          privacy,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is valid
          },
        }
      );

      // Handle success response
      setSuccessMessage(
        `Booking created successfully! Share this URL: ${response.data.publicURL}`
      );
      setPublicURL(response.data.publicURL);
      setTimeSlots([]); // Clear form after successful creation
      setTitle("");
      setHostName("");
      setLocation("");
      setType("One-Time");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Failed to create booking. Please try again."
      );
    }
  };

  return (
    <div className="container glass-container">
      <h2 className="title">Create an Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="input-text">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title (e.g., Office Hours)"
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

        {/* Type */}
        <div className="choose-privacy">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="booking-input"
          >
            <option value="One-Time">One-Time</option>
            <option value="Recurring">Recurring</option>
          </select>
        </div>

        <div class="choose-privacy">
              <label className="event-label" htmlFor="day">Event Privacy: </label>
              <select id="privacy" className="dropdown-privacy" name="privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value)} required>
                  <option class="privacy-input" value="" disabled>Pick an option</option>
                  <option class="privacy-input" value="member">Members Only</option>
                  <option class="privacy-input" value="public">Open to Everyone</option>
              </select>
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
          <label>Time slots:</label>
          {timeslots.map((time, index) => (
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

        {/* Error or Success Messages */}
        {error && <p className="error-message">{error}</p>}
        {successMessage && (
          <p className="success-message" style={{ color: "green" }}>
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
  );
};

export default CreateEvent;
