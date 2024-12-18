const nodemailer = require("nodemailer");
const CustomMeeting = require("../models/CustomMeeting");

// Create a new custom meeting
const createCustomMeeting = async (req, res) => {
  try {
    const { recipientEmail, proposedTimes, message, date, location } = req.body;
    const createdBy = req.user.email;

    // Validate required fields
    if (!recipientEmail || !proposedTimes || !date || !location) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Convert proposed times into full Date objects
    const fullProposedTimes = proposedTimes.map((time) => {
      const [hours, minutes] = time.split(":");
      const fullDate = new Date(date);
      fullDate.setHours(hours, minutes, 0, 0);
      return fullDate;
    });

    // Create and save the meeting
    const newMeeting = new CustomMeeting({
      recipientEmail,
      proposedTimes: fullProposedTimes,
      message,
      date: new Date(date),
      location,
      createdBy,
    });

    const savedMeeting = await newMeeting.save();

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Bookify Scheduler" <no-reply@bookify.com>`,
      to: recipientEmail,
      subject: "You've Received a Custom Meeting Invite!",
      text: `
        Hello,

        You've been invited to a custom meeting.

        Details:
        - Created By: ${createdBy}
        - Location: ${location}
        - Date: ${new Date(date).toDateString()}
        - Proposed Times: ${fullProposedTimes
          .map((time) => time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
          .join(", ")}
        - Message: ${message || "No additional details provided."}

        Please confirm your availability.

        Best regards,
        Bookify Scheduler
      `,
    };

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.response);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({ message: "Meeting created, but failed to send email invite." });
    }

    res.status(201).json({ message: "Meeting created and invite sent successfully.", meeting: savedMeeting });
  } catch (error) {
    console.error("Error creating custom meeting:", error);
    res.status(500).json({ message: "Failed to create custom meeting." });
  }
};

// Retrieve all custom meetings for the logged-in user
const getCustomMeetings = async (req, res) => {
  try {
    const meetings = await CustomMeeting.find({ createdBy: req.user.email });
    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching custom meetings:", error);
    res.status(500).json({ message: "Failed to fetch custom meetings." });
  }
};

// Update an existing custom meeting
const updateCustomMeeting = async (req, res) => {
  try {
    const { id } = req.params;
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
    const { id } = req.params;

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
