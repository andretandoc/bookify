import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ManageBooking() {
  //   const [email, setEmail] = useState("");
  //   const [startDate, setStartDate] = useState("");
  //   const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState({
    active: [],
    past: [],
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      setAppointments({ active: [], past: [] }); // Ensure proper default structure
      setMessage("");

      const token = localStorage.getItem("token");
      console.log("Token in Frontend:", token); // Debugging

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5005/api/appointments/private",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (
          response.data.activeAppointments.length === 0 &&
          response.data.pastAppointments.length === 0
        ) {
          setMessage("No appointments found");
        } else {
          setAppointments({
            active: response.data.activeAppointments || [],
            past: response.data.pastAppointments || [],
          });
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to retrieve appointments!"
        );
      }
    };
    fetchAppointments();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

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

  return (
    <main>
      <div className="content-wrap">
        <div className="container">
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
    </main>
  );
}

/*

    <div className="container">
            <h2>My Appointments:</h2>
            {message && <p>{message}</p>}

            {appointments.length > 0 && (
                <ul className="responsive-table">
                    <li className="table-header">
                        <p><strong>Name</strong></p>
                        <p><strong>Email</strong></p>
                        <p><strong>Date</strong></p>
                        <p><strong>Status</strong></p>
                        <p><strong>Actions</strong></p>
                    </li>
                    {appointments.map((appointment, index) => (
                        <li key={index} className="table-row">
                            <p>{appointment.name || "N/A"}</p>
                            <p>{appointment.email || "N/A"}</p>
                            <p>{appointment.Date ? new Date(appointment.Date).toLocaleString() : "N/A"}</p>
                            <p>{appointment.status || "N/A"}</p>
                            <div>
                                <button className="request-btn">Request Custom Meeting</button>
                                <button className="reject-btn">Cancel Meeting &#10060;</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}        
    </div>

*/
