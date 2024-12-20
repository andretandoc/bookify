// Saif Al-Alami 

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ManageBooking() {
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState({
    active: [],
    past: [],
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      setAppointments({ active: [], past: [] }); 
      setMessage("");

      const token = localStorage.getItem("token");

      try {
        const token = localStorage.getItem("token");
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(
          `${API_URL}/api/appointments/private`,
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
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await axios.delete(
        `${API_URL}/api/appointments/cancelprivate/${selectedAppointment}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove the canceled event from the state
      setAppointments((prev) => ({
        ...prev,
        active: prev.active.filter(
          (appointment) => appointment._id !== selectedAppointment
        ),
      }));

      setSuccessMessage("Event successfully canceled!"); 
    } catch (error) {
      console.error("Error canceling appointment:", error);
      setMessage(
        error.response?.data?.message || "Failed to cancel the appointment!"
      );
    } finally {
      closeModal();
    }
  };

  const renderAppointments = (appointments) => (
    <>
      {appointments.map((appointment, index) => (
        <li key={index} className="table-row">
          <div className="col" data-label="Event">
            {appointment.eventId?.title || "N/A"}
          </div>
          <div className="col" data-label="Host">
            {appointment.eventId?.createdBy || "N/A"}
          </div>
          <div className="col" data-label="Date & Time">
            {appointment.eventId?.startDate
              ? new Date(appointment.eventId.startDate).toLocaleString()
              : "Invalid Date"}
          </div>
          <div className="col" data-label="Location">
            {appointment.eventId?.location || "N/A"}
          </div>
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
        </li>
      ))}
    </>
  );

  return (
    <main class="layout">
      <aside className="sidebar">
        <ul className="menu">
          <li>
            <Link to="/MemberPage" className="link">
              Home
            </Link>
          </li>

          <li>
            <Link to="/CreateEvent" className="link">
              Create Events
            </Link>
          </li>
          <li>
            <Link to="/ManageEvent" className="link">
              Manage Events
            </Link>
          </li>
          <li>
            <Link to="/ManageBooking" className="link">
              Manage Meetings
            </Link>
          </li>
          <li>
            <Link to="/FullEvents" className="link">
              View All Events
            </Link>
          </li>

          <li>
            <Link to="/CustomMeeting" className="link">
              Custom Meeting
            </Link>
          </li>
        </ul>
      </aside>
      <div className="content-wrap">
        <div
          className="container"
          style={{ marginLeft: "100px", marginBottom: "50px" }}
        >
          <h2>Active Appointments:</h2>
          {appointments.active.length > 0 ? (
            <div className="table-wrapper">
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col">Event</div>
                  <div className="col">Host</div>
                  <div className="col">Date & Time</div>
                  <div className="col">Location</div>
                  <div className="col"></div>
                </li>
                {renderAppointments(appointments.active)}
              </ul>
            </div>
          ) : (
            <div className="no-events">
              <button className="double-btn">
                <Link to="/FullEvents" className="link">
                  Book
                </Link>
              </button>
              <p>{message}</p>
            </div>
          )}

        {successMessage && (
          <p className="success-message" style={{ color: "green", marginTop: "10px" }}>
            {successMessage}
          </p>
        )}
        </div>

        <div className="container" style={{ marginLeft: "100px" }}>
          <h2>Past Appointments:</h2>
          {appointments.past.length > 0 ? (
            <div className="table-wrapper">
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col">Event</div>
                  <div className="col">Host</div>
                  <div className="col">Date & Time</div>
                  <div className="col">Location</div>
                </li>
                {renderAppointments(appointments.past)}
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
