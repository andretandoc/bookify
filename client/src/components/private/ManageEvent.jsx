
import { useState, useEffect } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";


export default function ManageEvent() {

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
            <div class="container">
        <h2>My Active Events:</h2>
            <div class="table-wrapper">
                <ul class="responsive-table">
                    <li class="table-header">
                    <div class="col">Name</div>
                    <div class="col">Date</div>
                    <div class="col">From</div>
                    <div class="col">To</div>
                    <div class="col">Location</div>
                    <div class="col">Recurring</div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">Review Session : COMP307</div>
                    <div class="col" data-label="Date">12/12/2024</div>
                    <div class="col" data-label="From">9:00am</div>
                    <div class="col" data-label="To">12:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="Recurring">No</div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">Office Hours : COMP307</div>
                    <div class="col" data-label="Date">19/12/2024</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="Recurring">Yes</div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">Office Hours : COMP307</div>
                    <div class="col" data-label="Date">26/12/2024</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="Recurring">Yes</div>
                    </li>
                    
                </ul>
            </div>
            <div className="cancel-form-box">
                <form className="cancel-form">
                    <div className="select-event">
                    <p>Select event to cancel:</p>
                    <select className="dropdown-event" name="event">
                        <option value="" disabled> Select an option </option>
                        <option type="dropdown" className="events" name="events" value="Review Session">Comp 307 : Review Session</option>
                        <option type="dropdown" className="events" name="events" value="Office hours">Comp 307 : Office Hours</option>
                    </select>
                    </div>
                    
                    
                    <div className="cancel-from">
                        <label htmlFor="start-date">From:</label>
                        <input
                            type="date"
                            id="start-date"
                            name="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        </div>
                    
                    <div className="cancel-to">
                        <label htmlFor="end-date">To:</label>
                        <input
                            type="date"
                            id="end-date"
                            name="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </form>
                <div class="col"><button className="reject-btn" onClick={() => openModal(10)}>Cancel Event &#10060;</button></div>

            </div>
        </div>

        <div class="container">
        <h2>My Past Events:</h2>
            <div class="table-wrapper">
                <ul class="responsive-table">
                <li class="table-header">
                    <div class="col">Name</div>
                    <div class="col">Date</div>
                    <div class="col">From</div>
                    <div class="col">To</div>
                    <div class="col">Location</div>
                    <div class="col">Recurring</div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">Review Session : COMP307</div>
                    <div class="col" data-label="Date">12/12/2024</div>
                    <div class="col" data-label="From">9:00am</div>
                    <div class="col" data-label="To">12:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="Recurring">No</div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">Office Hours : COMP307</div>
                    <div class="col" data-label="Date">19/12/2024</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="Recurring">Yes</div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">Office Hours : COMP307</div>
                    <div class="col" data-label="Date">26/12/2024</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="Recurring">Yes</div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">Office Hours : COMP307</div>
                    <div class="col" data-label="Date">02/01/2025</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="Recurring">Yes</div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">Office Hours : COMP307</div>
                    <div class="col" data-label="Date">09/01/2025</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="Recurring">Yes</div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">Office Hours : COMP307</div>
                    <div class="col" data-label="Date">09/01/2025</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="Recurring">Yes</div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">Office Hours : COMP307</div>
                    <div class="col" data-label="Date">09/01/2025</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="Recurring">Yes</div>
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
    </main>
        
    );
}

