import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function ApptList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [appointments, setAppointments] = useState({ active: [], past: [] });
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // Initialize appointments from location.state
  useEffect(() => {
    const data = location.state?.appointments || { active: [], past: [] };
    setAppointments(data);

    if (data.active.length === 0 || data.past.length === 0) {
      setMessage("No appointments available");
    }
  }, [location.state]);

  // Handle "Go Back" button
  const handleGoBack = () => {
    navigate(-1); // Navigate back
  };

  // Modal controls
  const openModal = (meetingId) => {
    setSelectedMeeting(meetingId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
  };

  const confirmCancel = () => {
    console.log(`Meeting ${selectedMeeting} cancelled`);
    closeModal();
  };

  // Debugging logs
  console.log("Appointments in list:", appointments);
  console.log("Active appointments:", appointments.active);
  console.log("Past appointments:", appointments.past);

  return (
    <main className="layout">
      <div className="content-wrap">
        <button className="double-btn" onClick={handleGoBack}>
          Go Back
        </button>
        <div className="container">
          <h2>Active Appointments: </h2>
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
                      {appointment.event || "N/A"}
                    </div>
                    <div className="col" data-label="Host">
                      {appointment.host || "N/A"}
                    </div>
                    <div className="col" data-label="Email">
                      {appointment.email}
                    </div>
                    <div className="col" data-label="Date & Time">
                      {new Date(appointment.startDate).toLocaleString()}
                    </div>
                    <div className="col" data-label="Location">
                      {appointment.location || "N/A"}
                    </div>
                    <div className="col">
                      <button
                        className="reject-btn"
                        onClick={() => openModal(appointment._id)}
                      >
                        Cancel Meeting &#10060;
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>{message}</p>
          )}
        </div>

        <div className="container">
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
                      {appointment.event || "N/A"}
                    </div>
                    <div className="col" data-label="Host">
                      {appointment.host || "N/A"}
                    </div>
                    <div className="col" data-label="Email">
                      {appointment.email}
                    </div>
                    <div className="col" data-label="Date & Time">
                      {new Date(appointment.startDate).toLocaleString()}
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

      <div className="footer">
        <footer>
          <p> &copy; 2024 Bookify! McGill University </p>
        </footer>
      </div>
    </main>
  );
}

export default ApptList;
