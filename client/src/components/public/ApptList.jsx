import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";

function ApptList() {
  const navigate = useNavigate();
  const location = useLocation();
  const appointments = location.state?.appointments || []; // Default to empty array if undefined

  // Ref for the scrollable container
  const scrollContainerRef = useRef();

  const handleGoBack = () => {
    navigate(-1); // Navigate back
  };

  // Function to scroll the container left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  // Function to scroll the container right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <main className = "form-box-wrapper">
      <div className = "form-box">
        <h1 className = "title">Appointment History</h1>
        <div className = "appointment-scroll-container">
          <button className = "scroll-btn left" onClick = {scrollLeft}>
            &lt; 
          </button>
          <div className = "appointment-list" ref={scrollContainerRef}>
            {appointments.map((appointment, index) => (
              <div key={appointment._id || index} className = "appointment">
                <h3>Appointment {index + 1}</h3>
                <p className = "appt-list-item">
                  <strong>Host:</strong> {appointment.firstName || "N/A"}
                </p>
                <p className = "appt-list-item">
                  <strong>Email:</strong> {appointment.lastName || "N/A"}
                </p>
                <p className = "appt-list-item">
                  <strong>Date:</strong> {appointment.email || "N/A"}
                </p>
                <p className = "appt-list-item">
                  <strong>Time:</strong> {appointment.startDate ? new Date(appointment.startDate).toLocaleString() : "N/A"}
                </p>
                <p className="appt-list-item">
                  <strong>Location</strong> {appointment.endDate ? new Date(appointment.endDate).toLocaleString() : "N/A"}
                </p>
                <p className = "appt-list-item">
                  <strong>Status:</strong> {appointment.status || "N/A"}
                </p>

              </div>
            ))}
          </div>
          <button className = "scroll-btn right" onClick = {scrollRight}>
            &gt;
          </button>
        </div>
        <button className = "double-btn" onClick = {handleGoBack}>
          Go Back
        </button>
      </div>
    </main>
  );
}

export default ApptList;
