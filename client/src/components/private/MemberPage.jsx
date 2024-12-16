import React from "react";
import { Link } from "react-router-dom";

const MemberPage = () => {
  const meetings = [
    {
      title: "Meeting with Professor Joseph Vybhial",
      time: "Thursday Dec 12 at 5 pm",
      location: "McLennan",
    },
    {
      title: "Meeting with Professor Joseph Vybhial",
      time: "Thursday Dec 12 at 5 pm",
      location: "McLennan",
    },
    {
      title: "Meeting with Professor Joseph Vybhial",
      time: "Thursday Dec 12 at 5 pm",
      location: "McLennan",
    },
  ];

  return (
    <div className = "layout">
      {/* Sidebar */}
      <aside className = "sidebar">
        <ul className = "menu">

          <li>
            <Link to = "/CreateEvent" className = "link">
              Create Events
            </Link>
          </li>
          <li>
            <Link to = "/ManageEvent" className = "link">
              Manage Events
            </Link>
          </li>
          <li>
            <Link to = "/ManageBooking" className = "link">
              Manage Meetings
            </Link>
          </li>
          <li>
            <Link to = "/FullEvents" className = "link">
              Book an Appointment
            </Link>
          </li>

          <li>
            <Link to = "/CustomMeeting" className = "link">
              Custom Meeting
            </Link>
          </li>
            
          <li>
            <Link to = "/URLTest" className = "link">
            BookingURL-Test
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <section className = "container" style = {{boxShadow : "none", backgroundColor: "white"}}>
        <h1>Hey Leen!</h1>
        <h2>Your upcoming meetings:</h2>
        <div>
          {meetings.map((meeting, index) => (
            <div key={index} className="event-card">
              <div>
                <p className = "event-title">{meeting.title}</p>
                <p>
                  <strong>When:</strong> {meeting.time}
                </p>
                <p>
                  <strong>Where:</strong> {meeting.location}
                </p>
              </div>
              <button className = "double-btn">Manage</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MemberPage;
