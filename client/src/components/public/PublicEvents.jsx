// Leen Assaf

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PublicEvents() {
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchPublicEvents = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL; 
        const response = await axios.get(`${API_URL}/api/appointments/public`);

        setEvents(response.data.publicEvents);
        setMessage(""); 
      } catch (error) {
        console.error("Error fetching public events:", error);
        setMessage(
          error.response?.data?.message || "Failed to retrieve public events."
        );
        setEvents([]); 
      }
    };

    fetchPublicEvents();
  }, []);



  return (
    <main className="layout">
      <div className="container" style={{marginLeft:"20%", width:"53%"}}>
        <h2>Public Events at McGill:</h2>
        {message && <p>{message}</p>}
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <div>
                <p className="event-title">{event.title || "Event Name"}</p>
                <p>
                  <strong>Host:</strong> {event.createdBy || "N/A"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.startDate).toLocaleDateString() || "N/A"}
                </p>
                <p>
                  <strong>Location:</strong> {event.location || "N/A"}
                </p>
              </div>
              <a
                href={`/booking/${event.publicURL}`}
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                target="_self"
              >
                <button className="double-btn">Go to URL</button>
              </a>
            </div>
          ))
        ) : (
          <p>No public events available at the moment.</p>
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
