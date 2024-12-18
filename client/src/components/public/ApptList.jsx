import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ApptList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [appointments, setAppointments] = useState({ active: [], past: [] });
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize appointments from location.state
  useEffect(() => {
    const data = location.state?.appointments || { active: [], past: [] };
    setAppointments(data);

    if (data.active.length === 0 && data.past.length === 0) {
      setMessage("No appointments available");
    }
  }, [location.state]);

  // Handle "Go Back" button
  const handleGoBack = () => {
    navigate(-1); // Navigate back
  };


  const openModal = (appointmentID) => {
    setSelectedAppointment(appointmentID);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const confirmCancel = async () => {
    if (!selectedAppointment) return;
  
    try {
      console.log("im here");
      const API_URL = import.meta.env.VITE_API_URL;
  
      const response = await axios.delete(`${API_URL}/api/appointments/cancelpublic/${selectedAppointment}`);
      
      // Remove the canceled event from the state
      setAppointments((prev) => ({
        ...prev,
        active: prev.active.filter(
          (appointment) => appointment._id !== selectedAppointment),
      }));
      
      console.log(response.data);

      setSuccessMessage("Event successfully canceled!"); // Add success message
    } catch (error) {
      console.error("Error canceling appointment:", error);
      setMessage(
        error.response?.data?.message || "Failed to cancel the appointment!"
      );
    } finally {
      closeModal();
    }
  };


  return (
    <main className="layout">
      <div className="content-wrap" >
        <button className="double-btn" onClick={handleGoBack} style={{marginLeft:"77rem", marginTop:"50px"}}>
          Go Back
        </button>

        {/* Active Appointments */}
        <div className="container" style={{marginLeft: "350px",marginBottom: "50px"}}>
          <h2>Active Appointments:</h2>
          {appointments.active.length > 0 ? (
            <div className="table-wrapper">
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col">Event</div>
                  <div className="col">Host</div>
                  <div className="col">Email</div>
                  <div className="col">Date & Time</div>
                  <div className="col">Location</div>
                  <div className="col"></div>
                </li>
                {appointments.active.map((appointment, index) => (
                  <li key={index} className="table-row">
                    <div className="col" data-label="Event">
                      {appointment.eventId?.title || "N/A"}
                    </div>
                    <div className="col" data-label="Host">
                      {appointment.reservedBy?.firstName || "N/A"}{" "}
                      {appointment.reservedBy?.lastName || "N/A"}
                    </div>
                    <div className="col" data-label="Email">
                      {appointment.reservedBy?.email || "N/A"}
                    </div>
                    <div className="col" data-label="Date & Time">
                      {appointment.time
                        ? new Date(appointment.time).toLocaleString()
                        : "N/A"}
                    </div>
                    <div className="col" data-label="Location">
                      {appointment.location || "N/A"}
                    </div>
                    <div className="col">
                      <button
                        className="double-btn"
                        onClick={() => openModal(appointment._id)}
                        style={{
                          fontSize: "12px",
                          width: "80px",
                          height:"24px",
                          lineHeight:"24px",
                          background:"grey",
                          boxShadow: "-5px -5px 1px #1234"
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>{message}</p>
          )}

        {successMessage && (
          <p className="success-message" style={{ color: "green", marginTop: "10px" }}>
            {successMessage}
          </p>
        )}
        </div>

        {/* Past Appointments */}
        <div className="container"style={{marginLeft: "350px"}}>
          <h2>Past Appointments:</h2>
          {appointments.past.length > 0 ? (
            <div className="table-wrapper">
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col">Event</div>
                  <div className="col">Host</div>
                  <div className="col">Email</div>
                  <div className="col">Date & Time</div>
                  <div className="col">Location</div>
                </li>
                {appointments.past.map((appointment, index) => (
                  <li key={index} className="table-row">
                    <div className="col" data-label="Event">
                      {appointment.eventId || "N/A"}
                    </div>
                    <div className="col" data-label="Host">
                      {appointment.reservedBy?.firstName || "N/A"}{" "}
                      {appointment.reservedBy?.lastName || "N/A"}
                    </div>
                    <div className="col" data-label="Email">
                      {appointment.reservedBy?.email || "N/A"}
                    </div>
                    <div className="col" data-label="Date & Time">
                      {appointment.time
                        ? new Date(appointment.time).toLocaleString()
                        : "N/A"}
                    </div>
                    <div className="col" data-label="Location">
                      {appointment.location || "N/A"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>{message}</p>
          )}
        </div>

        {/* Cancel Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Are you sure you want to cancel this meeting?</h3>
              <div className="modal-buttons">
                <button className="btn-confirm" onClick={confirmCancel}>
                  Yes
                </button>
                <button className="btn-cancel" onClick={closeModal}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <footer>
          <p> &copy; 2024 Bookify! McGill University </p>
        </footer>
      </div>
    </main>
  );
}

export default ApptList;
