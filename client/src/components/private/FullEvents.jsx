
import { useState, useEffect } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";


export default function FullEvents() {

    const [message, setMessage] = useState("");
    const [appointments, setAppointments] = useState({
        active: []
    });

    useEffect(() => {
        const fetchAppointments = async () => {
        setAppointments({ active: []}); // Ensure proper default structure
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


      
    return (
        <main>
            <div class="container">
            <h2>All bookable Events at Mcgill:</h2>
            {appointments.active.length > 0 ? (
            <div class="table-wrapper">
                <ul class="responsive-table">
                    <li class="table-header">
                    <div class="col">Event</div>
                    <div class="col">Host</div>
                    <div class="col">Date</div>
                    <div class="col">From</div>
                    <div class="col">To</div>
                    <div class="col">Location</div>
                    <div class="col"></div>
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
                    </li>
                    ))}
                </ul>
            </div> 
            ) : (
            <p>{message}</p>
            )} 
        </div>
    </main>
    );
}


