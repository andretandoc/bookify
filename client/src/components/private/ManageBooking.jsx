import { useState, useEffect } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";


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
                <div class="container">
                <h2>Active Appointments:</h2>
                <div class="table-wrapper">
                    <ul class="responsive-table">
                        <li class="table-header">
                        <div class="col">Event</div>
                        <div class="col">Host</div>
                        <div class="col">Email</div>
                        <div class="col">Date & Time</div>
                        <div class="col">Location</div>
                        <div class="col"></div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Joseph V</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">McEng 3rd Floor</div>
                        <div class="col"><button className="reject-btn" onClick={() => openModal(1)}>Cancel Meeting &#10060;</button></div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP424</div>
                        <div class="col" data-label="Host">David Meger</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        <div class="col"><button className="reject-btn" onClick={() => openModal(2)}>Cancel Meeting &#10060;</button></div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP330</div>
                        <div class="col" data-label="Host">Waldisphul</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        <div class="col"><button className="reject-btn" onClick={() => openModal(3)}>Cancel Meeting &#10060;</button></div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        <div class="col"><button className="reject-btn" onClick={() => openModal(4)}>Cancel Meeting &#10060;</button></div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        <div class="col"><button className="reject-btn" onClick={() => openModal(5)}>Cancel Meeting &#10060;</button></div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        <div class="col"><button className="reject-btn" onClick={() => openModal(6)}>Cancel Meeting &#10060;</button></div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        <div class="col"><button className="reject-btn" onClick={() => openModal(7)}>Cancel Meeting &#10060;</button></div>
                        </li>
                    </ul>
                </div>
                <div class="list-btn"><p>Request a custom meeting:</p><button className="request-btn"><Link to="/CustomMeeting" style={style.btn}>Custom Meeting</Link></button></div>
            </div>

            <div class="container">
            <h2>Past Appointments:</h2>
                <div class="table-wrapper">
                    <ul class="responsive-table">
                        <li class="table-header">
                        <div class="col">Event</div>
                        <div class="col">Host</div>
                        <div class="col">Email</div>
                        <div class="col">Date & Time</div>
                        <div class="col">Location</div> 
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        </li>
                        <li class="table-row">
                        <div class="col" data-label="Host">Office Hours : COMP307</div>
                        <div class="col" data-label="Host">Karl Wehbe</div>
                        <div class="col" data-label="Email">karlwehbe@gmail.com</div>
                        <div class="col" data-label="Date & Time">12/12/2024 at 5:00pm</div>
                        <div class="col" data-label="Location">Mcgill</div>
                        </li>
                    </ul>
                </div>
            </div> 

            {isModalOpen && (
            <div className="modal-overlay">
            <div className="modal">
                <h3>Are you sure you want to cancel this meeting?</h3>
                <div className="modal-buttons">
                <button className="btn-confirm" onClick={confirmCancel}>Yes</button>
                <button className="btn-cancel" onClick={closeModal}>No</button>
                </div>
            </div>
            </div>
        )}
        </div>
            
    </main>
        
    );
}

const style = {
    btn: {
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
        cursor: "pointer",
        display: "block",
        width: "100%",
        fontWeight: "bold",
    }
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