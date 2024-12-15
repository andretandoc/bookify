import { useState } from "react";

function URLTest() {
    const [currentStep, setCurrentStep] = useState("ssaCheck");
    const [selectedTime, setSelectedTime] = useState("");
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [ssaStatus, setSsaStatus] = useState("");
    const [accommodation, setAccommodation] = useState("");

    // Simulating user logged-in status (replace this with actual login status logic)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSsaSubmit = (e) => {
        e.preventDefault();
        if (!ssaStatus) {
            alert("Please select your SSA registration status.");
            return;
        }

        if (ssaStatus === "no") {
            alert("Appointment booked successfully!");
        } else {
            setCurrentStep("accommodation");
        }
    };

    const handleAccommodationSubmit = (e) => {
        e.preventDefault();
        alert("Appointment booked successfully!");
    };

    const handleBackToSsa = () => {
        setCurrentStep("ssaCheck");
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    return (
        <main className="form-box-wrapper">
            <div className="booking-box">
                <div className="booking-title">
                    <h1 className="title">Title: COMP307 Office Hours</h1>
                    <h3>Hosted by Professor Joseph Vybihal on 13/12/2024</h3>
                </div>
                
                <div className="booking-form">
                    <div className="time-slots">
                        
                        {[
                            "11:00 am",
                            "11:15 am",
                            "11:30 am",
                            "11:45 am",
                            "12:00 pm",
                            "12:15 pm",
                            "12:30 pm",
                            "12:45 pm",
                            "1:00 pm",
            
                        ].map((time) => (
                            <button
                                key={time}
                                className={`slot-btn ${selectedTime === time ? 'selected' : ''}`}
                                onClick={() => handleTimeSelect(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                    <div className="attendee-info-form">
                        {selectedTime && (
                            <>  
                            <div className="form-title">
                                 {/* Back button at the top */}
                                {currentStep === "accommodation" && (
                                    <button
                                        className="back-btn"
                                        onClick={handleBackToSsa}
                                    >
                                        &#8592; 
                                    </button>
                                )}
                                    <h4 className="selected-time-header">
                                        Selected Time: <span className="bold-time">{selectedTime}</span>
                                    </h4>
                            </div>
                           
                                <form id="info-form" className="info-form">
                                    
                                    {/* If user is logged in */}
                                    {isLoggedIn ? (
                                        <>
                                            {currentStep === "ssaCheck" && (
                                                <div className="ssa-check">
                                                    <h4>Are you registered with SSA?</h4>
                                                    <select
                                                        value={ssaStatus}
                                                        onChange={(e) => setSsaStatus(e.target.value)}
                                                        required
                                                    >
                                                        <option value="" disabled>
                                                            Select an option
                                                        </option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </select>
                                                    <button
                                                        className="btn"
                                                        onClick={handleSsaSubmit}
                                                    >
                                                        {ssaStatus === "no"
                                                            ? "Book Appointment"
                                                            : "Next"}
                                                    </button>
                                                </div>
                                            )}
                                            {currentStep === "accommodation" && (
                                                <div className="accommodation-options">
                                                    <h4>Select the kind of accommodation you need:</h4>
                                                    <select
                                                        value={accommodation}
                                                        onChange={(e) =>
                                                            setAccommodation(e.target.value)
                                                        }
                                                    >
                                                        <option value="" disabled>
                                                            Select an option
                                                        </option>
                                                        <option value="disability">
                                                            Disability
                                                        </option>
                                                        <option value="hearing">
                                                            Hearing Problems
                                                        </option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                    <button
                                                        className="btn"
                                                        onClick={handleAccommodationSubmit}
                                                    >
                                                        Book Appointment
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        // If user is not logged in
                                        <div className="user-info">
                                            <input
                                                type="text"
                                                id="fname"
                                                name="fname"
                                                placeholder="Enter first name"
                                                value={fname}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                                required
                                            />
                                            <input
                                                type="text"
                                                id="lname"
                                                name="lname"
                                                placeholder="Enter last name"
                                                value={lname}
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                                required
                                            />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        
                                    )}
                                    <button className="btn" onClick={handleSsaSubmit}>Book Appointment</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default URLTest;
