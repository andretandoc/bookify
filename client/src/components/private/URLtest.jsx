import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // To decode the token

function URLTest() {
  const [currentStep, setCurrentStep] = useState("ssaCheck");
  const [eventDetails, setEventDetails] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reservationSuccess, setReservationSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false); // State to handle access denied
  const navigate = useNavigate();

  // User form data
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ssaStatus, setSsaStatus] = useState("");
  const [accommodation, setAccommodation] = useState("");

  // Replace this with actual logic to fetch logged-in status
  const token = localStorage.getItem("token"); // Replace this with actual token retrieval
  console.log("Token in Frontend:", token); // Debugging

  const { publicURL } = useParams(); // Extract the publicURL from route params

  // Decode user information from the token
  const getUserInfoFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return {
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
      };
    } catch (err) {
      console.error("Failed to decode token:", err);
      return null;
    }
  };

  // Prefill form fields for logged-in users
  useEffect(() => {
    if (token) {
      const userInfo = getUserInfoFromToken(token);
      if (userInfo) {
        setFirstName(userInfo.firstName || "");
        setLastName(userInfo.lastName || "");
        setEmail(userInfo.email || "");
      }
    }
  }, [token]);

  useEffect(() => {
    // Fetch event details and available time slots
    const fetchEventData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(
          `${API_URL}/api/appointments/${publicURL}`
        );
        setEventDetails(response.data.eventDetails);
        setTimeSlots(response.data.availableAppointments);

        console.log(response.data);

        // Check if the event is private and if the user has a token
        if (response.data.eventDetails.privacy === "Members-Only" && !token) {
          setAccessDenied(true); // Show access denied if no token
        }

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load event data.");
        setLoading(false);
      }
    };

    fetchEventData();
  }, [publicURL, token]); // Add authToken as a dependency

  const handleReserve = async (e) => {
    e.preventDefault();

    console.log("Form Data:", { fname, lname, email, selectedTimeSlotId });

    if (!selectedTimeSlotId) {
      alert("Please select a time slot.");
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      await axios.post(`${API_URL}/api/appointments/${publicURL}/reserve`, {
        firstName: fname,
        lastName: lname,
        email: email,
        timeSlotId: selectedTimeSlotId,
      });
      setShowModal(true); // Show the modal on success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reserve appointment.");
    }
  };

  const handleSSACheck = () => {
    if (ssaStatus === "no") {
      setReservationSuccess("Appointment booked successfully!");
      setShowModal(true); // Trigger the modal
    } else {
      setCurrentStep("accommodation");
    }
  };

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Error: {error}</div>;

  if (accessDenied) {
    return (
      <main className="form-box-wrapper">
        <div className="booking-box">
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <h2>Access Denied</h2>
            <p
              className="error-message"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              This event is private and requires a valid token to access.
            </p>
            <button className="double-btn" onClick={() => navigate("/login")}>
              Go to Login
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="form-box-wrapper">
      <div className="booking-box">
        <div className="booking-title">
          <h1 className="title">{eventDetails.title}</h1>
          <h3>Hosted by {eventDetails.createdBy}</h3>
          <p>{new Date(eventDetails.startDate).toLocaleDateString()}</p>
        </div>

        {/* Go Back Button */}
        <button
          className="double-btn"
          onClick={() => navigate(-1)} // This will navigate to the previous page
        >
          Go Back
        </button>

        <div className="time-slots">
          {timeSlots.length === 0 ? (
            <p className="error-message">No time slots available !</p>
          ) : (
            timeSlots.map((slot) => (
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
            ))
          )}
        </div>

        {selectedTimeSlotId && (
          <div className="attendee-info-form">
            <form id="info-form" className="info-form" onSubmit={handleReserve}>
              {token ? (
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
                        className="double-btn"
                        onClick={() => handleSSACheck()}
                        style={{
                          fontSize: "12px",
                          width: "80px",
                          height: "24px",
                          lineHeight: "24px",
                          boxShadow: "-5px -5px 1px #9e0918",
                        }}
                      >
                        {ssaStatus === "no" ? "Book" : "Next"}
                      </button>
                    </div>
                  )}

                  {currentStep === "accommodation" && (
                    <div>
                      <h4>Enter the kind of accommodation you need:</h4>
                      <input
                        type="text"
                        value={accommodation}
                        onChange={(e) => setAccommodation(e.target.value)}
                        placeholder="Enter accommodation details"
                        required
                        style={{
                          fontSize: "14px",
                          width: "300px",
                          height: "30px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          padding: "5px",
                          marginBottom: "10px",
                        }}
                      />
                      <button
                        className="double-btn"
                        type="submit"
                        style={{
                          fontSize: "15px",
                          width: "200px",
                          height: "34px",
                          lineHeight: "24px",
                          boxShadow: "-5px -5px 1px #9e0918",
                          marginTop: "10px",
                        }}
                      >
                        Book
                      </button>
                    </div>
                  )}
                </>
              ) : (
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
                    style={{
                      width: "23vh",
                      height: "3.5vh",
                      borderRadius: "0.5em",
                      borderWidth: "0.1em",
                      background: "none",
                    }}
                  />
                  <button
                    className="double-btn"
                    style={{ fontSize: "15px" }}
                    type="submit"
                  >
                    Book
                  </button>
                </>
              )}
            </form>
          </div>
        )}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              color: "black",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h2 style={{ margin: "0 0 10px" }}>Success</h2>
            <p style={{ margin: "0 0 20px" }}>
              Appointment booked successfully!
            </p>
            <button
              className="double-btn"
              onClick={() => navigate("/ManageBooking")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default URLTest;

//http://localhost:5173/booking/2885feabec5a2c4633dbf193c6a39369
