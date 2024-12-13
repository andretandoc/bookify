import { useState } from "react";

export default function CreateEvent() {

    const [email, setTitle] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [recurring, setRecurring] = useState(false);
    const [submeetings, setSubMeetings] = useState("")
    


    return (
        <main className="form-box-wrapper">
        <div className="form-box">
            <h1 className="title">Create an Event</h1>
            <form className="event-form" action="" method="">
                <div className="input-text">
                    <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter event title"
                    value={email}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />{" "}
                </div>
                <div class="choose-day">
                    <label className="event-label" htmlFor="day">Pick a day: </label>
                    <select id="day" className="dropdown-day" name="day" value={day} onChange={(e) => setDay(e.target.value)} required>
                        <option class="day-input" value="" disabled>Select a day</option>
                        <option class="day-input" value="Monday">Monday</option>
                        <option class="day-input" value="Tuesday">Tuesday</option>
                        <option class="day-input" value="Monday">Wednesday</option>
                        <option class="day-input" value="Tuesday">Thursday</option>
                        <option class="day-input" value="Monday">Friday</option>
                        <option class="day-input" value="Tuesday">Saturday</option>
                        <option class="day-input" value="Monday">Sunday</option>
                    </select>
                </div>
                    <div class="input-time">
                        <label className="event-label" htmlFor="start-time">From: </label>
                        <input type="time" className="time-input" id="start-time" name="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required></input>
                    </div>
                    <div class="input-time">
                        <label className="event-label" htmlFor="end-time">To: </label>
                        <input type="time" className="time-input" id="end-time" name="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required ></input>
                    </div>
                    <div className="split-event">
                        <label className="event-label" for="quantity">Number of meetings in event:</label>
                        <input type="number" className="event-quantity" id="quantity" name="quantity" min="1" max="15" value={submeetings} onChange={(e) => setSubMeetings(e.target.value)}  required></input>
                    </div>
                    
                    <div class="choose-recurring">
                    <label className="event-label" htmlFor="day">Recurring Event: </label>
                    <select id="day" className="dropdown-recurring" name="day" value={recurring} onChange={(e) => setRecurring(e.target.value)} required>
                        <option class="day-input" value="" disabled>Pick an option</option>
                        <option class="day-input" value="yes">Yes</option>
                        <option class="day-input" value="no">No</option>
                    </select>
                </div>
                    
                    <button className="small-btn" type="submit" onClick="">
                        Create Event
                    </button>

                </form>
            </div>
        </main>
    )
}