import { useState } from "react";

export default function CreateEvent() {

    const [email, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [recurring, setRecurring] = useState(false);
    const [submeetings, setSubMeetings] = useState("")
    const [privacy, setPrivacy] = useState("");
    const [message, setMessage] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate required fields
        if (!title || !date || !startTime || !endTime || !submeetings) {
            setMessage("Please fill in all required fields.");
            return;
        }

        // Prepare the event data
        const eventData = {
            title,
            date,
            start_time: startTime,
            end_time: endTime,
            recurring,
            submeetings: parseInt(submeetings, 10), // Ensure submeetings is a number
            privacy,
        };

        try {
            const response = await fetch("https://your-api-endpoint.com/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage("Event created successfully!");
                console.log(result);
            } else {
                setMessage("Failed to create event. Please try again.");
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("API call failed:", error);
            setMessage("An error occurred. Please try again.");
        }
    };


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
                    <div className="choose-date">
                        <label className="event-label" htmlFor="start-date">Date:</label>
                        <input
                            type="date"
                            id="start-date"
                            name="start-date"
                            className="date-input"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div class="input-time">
                        <label className="event-label" htmlFor="start-time">Start time: </label>
                        <input type="time" className="time-input" id="start-time" name="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required></input>
                    </div>
                    <div class="input-time">
                        <label className="event-label" htmlFor="end-time">End time: </label>
                        <input type="time" className="time-input" id="end-time" name="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required ></input>
                    </div>
                    <div className="split-event">
                        <label className="event-label" for="quantity">Total time slots: </label>
                        <input type="number" className="event-quantity" id="quantity" name="quantity" min="1" max="15" value={submeetings} onChange={(e) => setSubMeetings(e.target.value)}  required></input>
                    </div>
                    
                    <div class="choose-recurring">
                        <label className="event-label" htmlFor="day">Recurring Event: </label>
                        <select id="recurring" className="dropdown-recurring" name="recurring" value={recurring} onChange={(e) => setRecurring(e.target.value)} required>
                            <option class="recurring-input" value="" disabled>Pick an option</option>
                            <option class="recurring-input" value="daily">Daily</option>
                            <option class="recurring-input" value="weekly">Weekly</option>
                            <option class="recurring-input" value="monthly">Monthly</option>
                        </select>
                    </div>

                    <div class="choose-privacy">
                        <label className="event-label" htmlFor="day">Event Privacy: </label>
                        <select id="privacy" className="dropdown-privacy" name="privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value)} required>
                            <option class="privacy-input" value="" disabled>Pick an option</option>
                            <option class="privacy-input" value="member">Members Only</option>
                            <option class="privacy-input" value="public">Open to Everyone</option>
                        </select>
                    </div>
                    {message && <p>{message}</p>}
                    <button className="small-btn" type="submit" onClick={handleSubmit}>
                        Create Event
                    </button>
                </form>
            </div>
        </main>
    )
}