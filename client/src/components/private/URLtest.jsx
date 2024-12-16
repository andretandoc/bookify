import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";

function URLTest() {
  const [currentStep, setCurrentStep] = useState("ssaCheck");
  const [eventDetails, setEventDetails] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reservationSuccess, setReservationSuccess] = useState("");

  // User form data
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ssaStatus, setSsaStatus] = useState("");
  const [accommodation, setAccommodation] = useState("");

  // Replace this with actual logic to fetch logged-in status
  const [isLoggedIn] = useState(false);

  const { publicURL } = useParams(); // Extract the publicURL from route params

  useEffect(() => {
    // Fetch event details and available time slots
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/appointments/${publicURL}`
        );
        setEventDetails(response.data.eventDetails);
        setTimeSlots(response.data.availableAppointments);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load event data.");
        setLoading(false);
      }
    };

    fetchEventData();
  }, [publicURL]);

  const handleReserve = async (e) => {
    e.preventDefault();
    if (!selectedTimeSlotId) {
      alert("Please select a time slot.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5005/api/appointments/${publicURL}/reserve`,
        {
          firstName: fname,
          lastName: lname,
          email: email,
          timeSlotId: selectedTimeSlotId,
        }
      );
      setReservationSuccess("Appointment booked successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reserve appointment.");
    }
  };

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (reservationSuccess) return <div>{reservationSuccess}</div>;

  return (
    <main className="form-box-wrapper">
      <div className="booking-box">
        <div className="booking-title">
          <h1 className="title">{eventDetails.title}</h1>
          <h3>Hosted by {eventDetails.createdBy}</h3>
          <p>{new Date(eventDetails.startDate).toLocaleDateString()}</p>
        </div>

        <div className="time-slots">
          {timeSlots.map((slot) => (
            <button
              key={slot._id}
              className={`slot-btn ${
                selectedTimeSlotId === slot._id ? "selected" : ""
              }`}
              onClick={() => setSelectedTimeSlotId(slot._id)}
            >
              {new Date(slot.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </button>
          ))}
        </div>

        {selectedTimeSlotId && (
          <div className="attendee-info-form">
            <form id="info-form" className="info-form" onSubmit={handleReserve}>
              {!isLoggedIn ? (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={fname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btn" type="submit">
                    Book Appointment
                  </button>
                </>
              ) : (
                <>
                  {currentStep === "ssaCheck" && (
                    <div className="ssa-check">
                      <h4>Are you registered with SSA?</h4>
                      <select
                        value={ssaStatus}
                        onChange={(e) => setSsaStatus(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <button
                        className="btn"
                        onClick={() =>
                          ssaStatus === "no"
                            ? setReservationSuccess(
                                "Appointment booked successfully!"
                              )
                            : setCurrentStep("accommodation")
                        }
                      >
                        {ssaStatus === "no" ? "Book Appointment" : "Next"}
                      </button>
                    </div>
                  )}

                  {currentStep === "accommodation" && (
                    <div>
                      <h4>Select the kind of accommodation:</h4>
                      <select
                        value={accommodation}
                        onChange={(e) => setAccommodation(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="disability">Disability</option>
                        <option value="hearing">Hearing Problems</option>
                        <option value="other">Other</option>
                      </select>
                      <button className="btn" type="submit">
                        Book Appointment
                      </button>
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

export default URLTest;
