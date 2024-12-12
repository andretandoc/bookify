import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";

function BookingForm() {
    // State to manage the current step
    const [currentStep, setCurrentStep] = useState("details");
    const [email, setEmail] = useState("");
    const [ssaStatus, setSsaStatus] = useState("");
    const [accommodation, setAccommodation] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [showTimeDropdown, setShowTimeDropdown] = useState(false); // New state
  
    const handleDetailsSubmit = (e) => {
      e.preventDefault();
      if (!email) {
        alert("Please enter your email.");
        return;
      }
  
      if (email.endsWith("@mail.mcgill.ca") || email.endsWith("@mcgill.ca")) {
        setCurrentStep("ssaCheck");
      } else {
        setCurrentStep("calendar");
      }
    };
  
    const handleSsaSubmit = (e) => {
      e.preventDefault();
      if (!ssaStatus) {
        alert("Please select your SSA registration status.");
        return;
      }
  
      if (ssaStatus === "yes") {
        setCurrentStep("accommodation");
      } else {
        setCurrentStep("calendar");
      }
    };
  
    const handleAccommodationSubmit = (e) => {
      e.preventDefault();
      setCurrentStep("calendar");
    };
  
    const handleDateSelect = (day, month, year) => {
      setSelectedDate(`${day}/${month + 1}/${year}`);
      setSelectedTime(e.target.value);
    };
  
    const handleTimeSelect = (e) => {
      setSelectedTime(e.target.value);
      alert(`You selected time: ${e.target.value}`);
    };
  
    const renderCalendar = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const calendarDays = [];
  
      for (let i = 0; i < firstDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} class="day empty"></div>);
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(
          <div key={day} className="day" onClick={() => handleDateSelect(day, month, year)}>
            {day}
          </div>
        );
      }
  
      return (
        <div class="calendar">
          {dayNames.map((day) => (
            <div key={day} class="day-header">
              {day}
            </div>
          ))}
          {calendarDays}
        </div>
      );
    };
  
    return (
        <div class="container">
            {currentStep === "details" && (
            <div class="name-email-form">
                <h3>Enter Your Details</h3>
                <form onSubmit={handleDetailsSubmit}>
                <label htmlFor="email">Email:</label>
                <input class="booking-input" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button class="btn" type="submit">Next</button>
                </form>
            </div>
            )}
    
            {currentStep === "ssaCheck" && (
            <div class="ssa-check">
                <h4>Are you registered with SSA?</h4>
                <select value={ssaStatus} onChange={(e) => setSsaStatus(e.target.value)} required>
                <option class="booking-input" value="" disabled>Select an option</option>
                <option class="booking-input" value="yes">Yes</option>
                <option class="booking-input" value="no">No</option>
                </select>
                <button class="btn" onClick={handleSsaSubmit}>Next</button>
            </div>
            )}
    
            {currentStep === "accommodation" && (
            <div class="accommodation-options">
                <h4>Select the kind of accommodation you need:</h4>
                <select class="accomodation" value={accommodation} onChange={(e) => setAccommodation(e.target.value)}>
                <option value="" disabled> Select an option </option>
                <option class="booking-input" value="disability">Disability</option>
                <option class="booking-input" value="hearing">Hearing Problems</option>
                <option class="booking-input" value="other">Other</option>
                </select>
                <button class="btn" onClick={handleAccommodationSubmit}>Proceed to Calendar</button>
            </div>
            )}
    
            {currentStep === "calendar" && (
            <div id="calendar-section">
                <h3>Schedule Your Meeting</h3>
                <div id = "meeting-info" class = "info-panel">
                    <h3> Meeting Information </h3>
                    <p><strong> Host: </strong> Dr. John Doe </p>
                    <p><strong> Length: </strong> 30 minutes</p>
                    <p><strong> Location: </strong> Room 305, McGill University </p>
                </div>
                <div>{renderCalendar()}</div>
    
                {showTimeDropdown && (
                    <div id="time-selection">
                    <h4>Select a Time</h4>
                    <select className="accommodation" id="time-dropdown" value={selectedTime} onChange={handleTimeSelect}>
                        <option className="booking-input" value="" disabled> Select a time </option>
                        <option className="booking-input" value="09:00 AM"> 09:00 AM </option>
                        <option className="booking-input" value="10:00 AM"> 10:00 AM </option>
                        <option className="booking-input" value="11:00 AM"> 11:00 AM </option>
                        <option className="booking-input" value="02:00 PM"> 02:00 PM </option>
                        <option className="booking-input" value="03:00 PM"> 03:00 PM </option>
                    </select>
                    </div>
                )}
            </div>
            )}
        </div>
    );
  }

export default BookingForm