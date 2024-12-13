import { useState, useEffect } from "react";
import axios from "axios"; 


export default function ManageBooking () {

    const [email, setEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [message, setMessage] = useState("");
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            setAppointments([]);
            setMessage("");

            try {
                const response = await axios.get(
                    "http://localhost:5005/api/appointments",
                    {
                        params: {
                            token, // Make sure `token` is properly defined in your actual code
                        },
                    }
                );

                if (response.data.length === 0) {
                    setMessage("No appointments found");
                } else {
                    setAppointments(response.data.appointments);
                }
            } catch (error) {
                setMessage(
                    error.response?.data?.message || "Failed to retrieve appointments!"
                );
            }
        };
        fetchAppointments();
    }, []); // Empty dependency array ensures it runs once on component mount

    return (
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
    );
}