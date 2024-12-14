
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function BookingURL() {

    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    return (
        <main className="form-box-wrapper">
            <div className="booking-box">
                <div class="booking-title">
                <h1 className="title">Title : COMP307 Office Hours</h1>
                <h3>Hosted by Professor Joseph Vybihal on 13/12/2024</h3>
                </div>
                <div className="booking-form">
                    <div className="time-slots">
                        <button class="slot-btn">11:00 am</button>
                        <button class="slot-btn">11:15 am</button>
                        <button class="slot-btn">11:30 am</button>
                        <button class="slot-btn">11:45 am</button>
                        <button class="slot-btn">12:00 pm</button>
                        <button class="slot-btn">12:15 pm</button>
                        <button class="slot-btn">12:30 pm</button>
                        <button class="slot-btn">11:45 pm</button>
                        <button class="slot-btn">1:00 pm</button>
                    </div>
                    <div className="attendee-info-form">
                        {/* if the user is a mcgill member, we ask for ssa...*/
                        /* if not, we ask for user info such as name, email, ...*/}  
                         <form id="info-form" className="info-form" action="" method="">
                            <div class="input-text">
                                <div class="f-name">
                                    <input
                                        type="text"
                                        id="fname"
                                        name="fname"
                                        placeholder="Enter first name"
                                        value={fname}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />{" "}
                                </div>
                                <div class="l-name">
                                    <input
                                        type="text"
                                        id="lname"
                                        name="lname"
                                        placeholder="Enter last name"
                                        value={lname}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                />{" "}
                                </div>
                                <div className="input">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        />{" "}
                                </div> 
                            </div>
                            {message && <p class="error-message">{message}</p>}
                            <button class="booking-small-btn" type="submit" onClick="">
                                Book Appointment
                            </button>
                            
                        </form>      
                    </div>
                </div>
            </div>
        </main>
    )
   
    
}

export default BookingURL;

