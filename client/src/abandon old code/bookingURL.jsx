import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookingURL() {
  const { publicURL } = useParams(); // Get publicURL from the route
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(""); // Selected time slot
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(
          `${API_URL}/api/appointments/${publicURL}`
        );
        setAppointmentDetails(response.data);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load booking details. Please try again later.");
      }
    };

    fetchAppointmentDetails();
  }, [publicURL]);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      setMessage("Please select a time slot.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/appointments/${publicURL}/reserve`,
        {
          firstName: fname,
          lastName: lname,
          email,
        }
      );

      setMessage("Appointment booked successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to book appointment. Please try again.");
    }
  };

  if (!appointmentDetails) {
    return <p>Loading...</p>;
  }

  return (
    <main className="form-box-wrapper">
      <div className="booking-box">
        <div className="booking-title">
          <h1 className="title">Title: {appointmentDetails.event}</h1>
          <h3>
            Hosted by {appointmentDetails.host} at {appointmentDetails.location}
          </h3>
        </div>
        <div className="booking-form">
          <div className="time-slots">
            {appointmentDetails.proposedTimes.map((slot, index) => (
              <button
                key={index}
                className={`slot-btn ${
                  selectedSlot === slot ? "selected" : ""
                }`}
                onClick={() => handleSlotSelect(slot)}
              >
                {new Date(slot).toLocaleString()}
              </button>
            ))}
          </div>
          <div className="attendee-info-form">
            <form
              id="info-form"
              className="info-form"
              onSubmit={handleBookingSubmit}
            >
              <div className="input-text">
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Enter first name"
                  value={fname}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Enter last name"
                  value={lname}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {message && <p className="error-message">{message}</p>}
              <button className="booking-small-btn" type="submit">
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookingURL;
