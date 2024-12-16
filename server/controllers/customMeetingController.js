const CustomMeeting = require("../models/CustomMeeting");

// Create a new custom meeting
const createCustomMeeting = async (req, res) => {
  try {
    const { recipientEmail, proposedTimes, message, date, location } = req.body;
    const createdBy = req.user.email; // Extract user email from the token (assumed middleware)

    // Validate required fields
    if (!recipientEmail || !proposedTimes || !date || !location) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Create a new meeting document
    const newMeeting = new CustomMeeting({
      recipientEmail,
      proposedTimes,
      message,
      date,
      location,
      createdBy,
    });

    const savedMeeting = await newMeeting.save(); // Save the meeting to the database
    res.status(201).json({ message: "Custom meeting created successfully.", meeting: savedMeeting });
  } catch (error) {
    console.error("Error creating custom meeting:", error);
    res.status(500).json({ message: "Failed to create custom meeting." });
  }
};

// Retrieve all custom meetings for the logged-in user
const getCustomMeetings = async (req, res) => {
  try {
    const meetings = await CustomMeeting.find({ createdBy: req.user.email }); // Fetch meetings by user
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching custom meetings:", error);
    res.status(500).json({ message: "Failed to fetch custom meetings." });
  }
};

// Update an existing custom meeting
const updateCustomMeeting = async (req, res) => {
  try {
    const { id } = req.params; // Meeting ID from the request parameters
    const updates = req.body;

    const updatedMeeting = await CustomMeeting.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedMeeting) {
      return res.status(404).json({ message: "Meeting not found." });
    }

    res.status(200).json({ message: "Custom meeting updated successfully.", meeting: updatedMeeting });
  } catch (error) {
    console.error("Error updating custom meeting:", error);
    res.status(500).json({ message: "Failed to update custom meeting." });
  }
};

// Delete a custom meeting
const deleteCustomMeeting = async (req, res) => {
  try {
    const { id } = req.params; // Meeting ID from the request parameters

    const deletedMeeting = await CustomMeeting.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return res.status(404).json({ message: "Meeting not found." });
    }

    res.status(200).json({ message: "Custom meeting deleted successfully." });
  } catch (error) {
    console.error("Error deleting custom meeting:", error);
    res.status(500).json({ message: "Failed to delete custom meeting." });
  }
};

module.exports = {
  createCustomMeeting,
  getCustomMeetings,
  updateCustomMeeting,
  deleteCustomMeeting,
};
