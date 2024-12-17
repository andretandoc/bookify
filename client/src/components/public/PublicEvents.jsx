// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function PublicEvents() {

//     const [message, setMessage] = useState("");
//     const [appointments, setAppointments] = useState([]);

//     useEffect(() => {
//         const fetchAppointments = async () => {
//             setAppointments([]);
//             setMessage("");

//             try {
//                 const response = await axios.get(
//
//                     {
//                         params: {
//                              // Make sure `token` is properly defined in your actual code
//                         },
//                     }
//                 );

//                 if (response.data.length === 0) {
//                     setMessage("No appointments found");
//                 } else {
//                     setAppointments(response.data.appointments);
//                 }
//             } catch (error) {
//                 setMessage(
//                     error.response?.data?.message || "Failed to retrieve appointments!"
//                 );
//             }
//         };
//         fetchAppointments();
//     }, []); // Empty dependency array ensures it runs once on component mount

//     return (
//         <main>
//             <div class = "container">
//                 <h2>Public Events at Mcgill:</h2>
//                 <div class = "table-wrapper">
//                     <ul class = "responsive-table">
//                         <li class = "table-header">
//                             <div class = "col">Event</div>
//                             <div class = "col">Host</div>
//                             <div class = "col">Date</div>
//                             <div class = "col">From</div>
//                             <div class = "col">To</div>
//                             <div class = "col">Location</div>
//                             <div class = "col"></div>
//                         </li>

//                         <li class = "table-row">
//                             <div class = "col" data-label = "Name">OH: COMP206</div>
//                             <div class = "col" data-label = "Host">J. Vybihal</div>
//                             <div class = "col" data-label = "Date">12/12/2024</div>
//                             <div class = "col" data-label = "From">9:00am</div>
//                             <div class = "col" data-label = "To">12:00pm</div>
//                             <div class = "col" data-label = "Location">McEng 3rd Floor</div>
//                             <div class = "col" data-label = "URL"><button>Go to URL</button></div>
//                         </li>

//                         <li class="table-row">
//                             <div class = "col" data-label = "Name">OH: COMP307</div>
//                             <div class = "col" data-label="Host">J. Vybihal</div>
//                             <div class="col" data-label="Date">19/12/2024</div>
//                             <div class = "col" data-label = "From">11:00am</div>
//                             <div class = "col" data-label = "To">1:00pm</div>
//                             <div class = "col" data-label = "Location">McEng 3rd Floor</div>
//                             <div class = "col" data-label = "URL"><button>Go to URL</button></div>
//                         </li>

//                         <li class = "table-row">
//                             <div class = "col" data-label = "Name">OH: COMP424</div>
//                             <div class = "col" data-label = "Host">David Meger</div>
//                             <div class = "col" data-label = "Date">26/12/2024</div>
//                             <div class = "col" data-label = "From">11:00am</div>
//                             <div class = "col" data-label = "To">1:00pm</div>
//                             <div class = "col" data-label = "Location">McEng 3rd Floor</div>
//                             <div class = "col" data-label = "URL"><button>Go to URL</button></div>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </main>

//     );
// }

import React, { useState, useEffect } from "react";

export default function PublicEvents() {
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const dummyEvents = [
      {
        title: "OH: COMP206",
        host: "J. Vybihal",
        date: "12/12/2024",
        startTime: "9:00 AM",
        endTime: "12:00 PM",
        location: "McEng 3rd Floor",
        url: "http://example.com/event1",
      },
      {
        title: "OH: COMP307",
        host: "J. Vybihal",
        date: "19/12/2024",
        startTime: "11:00 AM",
        endTime: "1:00 PM",
        location: "McEng 3rd Floor",
        url: "http://example.com/event2",
      },
      {
        title: "OH: COMP424",
        host: "David Meger",
        date: "26/12/2024",
        startTime: "11:00 AM",
        endTime: "1:00 PM",
        location: "McEng 3rd Floor",
        url: "http://example.com/event3",
      },
      {
        title: "OH: COMP330",
        host: "Wald",
        date: "26/12/2024",
        startTime: "11:00 AM",
        endTime: "1:00 PM",
        location: "McEng 3rd Floor",
        url: "http://example.com/event4",
      },
      {
        title: "OH: COMP350",
        host: "Ronaldo",
        date: "26/12/2024",
        startTime: "11:00 AM",
        endTime: "1:00 PM",
        location: "McEng 3rd Floor",
        url: "http://example.com/event5",
      },
    ];

    // Simulate fetching events
    setAppointments(dummyEvents);
  }, []);

  return (
    <main className="layout">
      <div className="container">
        <h2>Public Events at McGill:</h2>
        {message && <p>{message}</p>}
        {appointments.map((event, index) => (
          <div key={index} className="event-card">
            <div>
              <p className="event-title">{event.title || "Event Name"}</p>
              <p>
                <strong>Host:</strong> {event.host || "N/A"}
              </p>
              <p>
                <strong>Date:</strong> {event.date || "N/A"}
              </p>
              <p>
                <strong>From:</strong> {event.startTime || "N/A"}
              </p>
              <p>
                <strong>To:</strong> {event.endTime || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {event.location || "N/A"}
              </p>
            </div>
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button className="double-btn">Go to URL</button>
            </a>
          </div>
        ))}
      </div>

      <div className="footer">
        <footer>
          <p> &copy; 2024 Bookify! McGill University </p>
        </footer>
      </div>
    </main>
  );
}
