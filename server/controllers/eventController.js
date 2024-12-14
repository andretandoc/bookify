const Appointment = require("../models/Appointment");

// Fetch appointments based on filters
const getAppointments = async (req, res) => {
  try {      
    const { 
        title, 
        date, 
        start_time, 
        end_time, 
        recurring, 
        submeetings,
        privacy,
    } = req.body;
    
    const userEmail = req.user?.email; // Assuming req.user is populated by authentication middleware
    const userName = req.user?.name;

    if (!title || !date || !start_time || !end_time || !submeetings) {
    return res.status(400).json({ message: "Please provide all required fields." });
    }

    if (!userEmail || !userName) {
    return res.status(401).json({ message: "User information is required to create an event." });
    }

    // Validate time logic
    if (new Date(`${date}T${end_time}`) <= new Date(`${date}T${start_time}`)) {
    return res.status(400).json({ message: "End time must be after start time." });
    }

    // Recurrence validation (if applicable)
    const validRecurrenceOptions = ["daily", "weekly", "monthly", ""];
    if (!validRecurrenceOptions.includes(recurring)) {
    return res.status(400).json({ message: "Invalid recurrence option." });
    }

    const submeetingsCount = parseInt(submeetings, 10);
    if (isNaN(submeetingsCount) || submeetingsCount <= 0) {
      return res.status(400).json({ message: "Number of submeetings must be a positive integer." });
    }

    // Default privacy if not provided
    const eventPrivacy = privacy || "public"; // "public" or "private"

    // Create event object
    const newEvent = new Event({
        title,
        date: new Date(date), // Ensure it's stored as a proper date
        start_time,
        end_time,
        recurring,
        submeetings: parseInt(submeetings, 10), // Ensure it's an integer
        privacy: eventPrivacy,
        createdBy: {
            email: userEmail,
            name: userName,
        },
    });

    // Save to database
    const savedEvent = await newEvent.save();

    res.status(201).json({ message: "Event created successfully!", event: savedEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = { createEvent };