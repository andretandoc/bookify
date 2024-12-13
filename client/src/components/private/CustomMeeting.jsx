import { useState } from "react";

const CustomMeeting = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [proposedTimes, setProposedTimes] = useState([]);
  const [message, setMessage] = useState("");

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
  );
};

export default CustomMeeting;
