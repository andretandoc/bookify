
import { useState, useEffect } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";


export default function PublicEvents() {

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
                             // Make sure `token` is properly defined in your actual code
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
        <main>
            <div class="container">
        <h2>Public Events at Mcgill:</h2>
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
                    <li class="table-row">
                    <div class="col" data-label="Name">OH: COMP206</div>
                    <div class="col" data-label="Host">J. Vybihal</div>
                    <div class="col" data-label="Date">12/12/2024</div>
                    <div class="col" data-label="From">9:00am</div>
                    <div class="col" data-label="To">12:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="URL"><button>Go to URL</button></div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">OH: COMP307</div>
                    <div class="col" data-label="Host">J. Vybihal</div>
                    <div class="col" data-label="Date">19/12/2024</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="URL"><button>Go to URL</button></div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">OH: COMP424</div>
                    <div class="col" data-label="Host">David Meger</div>
                    <div class="col" data-label="Date">26/12/2024</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="URL"><button>Go to URL</button></div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">OH: COMP330</div>
                    <div class="col" data-label="Host">Wald</div>
                    <div class="col" data-label="Date">26/12/2024</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="URL"><button>Go to URL</button></div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">OH: COMP350</div>
                    <div class="col" data-label="Host">Ronaldo</div>
                    <div class="col" data-label="Date">26/12/2024</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="URL"><button>Go to URL</button></div>
                    </li>
                    <li class="table-row">
                    <div class="col" data-label="Name">OH: COMP360</div>
                    <div class="col" data-label="Host">Hatami</div>
                    <div class="col" data-label="Date">26/12/2024</div>
                    <div class="col" data-label="From">11:00am</div>
                    <div class="col" data-label="To">1:00pm</div>
                    <div class="col" data-label="Location">McEng 3rd Floor</div>
                    <div class="col" data-label="URL"><button>Go to URL</button></div>
                    </li>
                    
                </ul>
            </div>
        </div>
    </main>
        
    );
}



