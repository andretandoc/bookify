import { useState } from "react";
import axios from "axios";

const CreateBooking = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("One-Time");
  const [hostName, setHostName] = useState(""); // Host Name Field
  const [location, setLocation] = useState(""); // Location Field
  const [proposedTimes, setProposedTimes] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [publicURL, setPublicURL] = useState("");

  // Add new proposed time
  const addProposedTime = () => {
    setProposedTimes([...proposedTimes, ""]);
  };

  // Handle changes for proposed time inputs
  const handleProposedTimeChange = (index, value) => {
    const updatedTimes = [...proposedTimes];
    updatedTimes[index] = value;
    setProposedTimes(updatedTimes);
  };

  // Remove a specific proposed time
  const handleRemoveTime = (index) => {
    setProposedTimes(proposedTimes.filter((_, i) => i !== index));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccessMessage("");

    // Validation: Ensure all required fields are filled
    if (!title || !hostName || !location || proposedTimes.length === 0) {
      setError(
        "Please fill out all required fields and add at least one proposed time."
      );
      return;
    }

    try {
      const response = await axios.post(
        "/api/appointments/create",
        {
          event: title,
          host: hostName, // Dynamic Host Name
          location: location, // Dynamic Location
          proposedTimes, // Array of proposed time slots
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
      setProposedTimes([]); // Clear form after successful creation
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
      <h2 className="title">Create a Booking</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="input-text">
          <label htmlFor="title">Title:</label>
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

        {/* Type */}
        <div className="input-text">
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

        {/* Host Name */}
        <div className="input-text">
          <label htmlFor="hostName">Host Name:</label>
          <input
            type="text"
            id="hostName"
            value={hostName}
            onChange={(e) => setHostName(e.target.value)}
            placeholder="Enter host's name"
            required
            className="booking-input"
          />
        </div>

        {/* Location */}
        <div className="input-text">
          <label htmlFor="location">Location:</label>
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
                type="datetime-local"
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
              View Booking Link
            </a>
          </p>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn">
          Create Booking
        </button>
      </form>
    </div>
  );
};

export default CreateBooking;
