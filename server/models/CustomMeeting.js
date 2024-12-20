// Saif Al-Alami

const mongoose = require("mongoose");

const CustomMeetingSchema = new mongoose.Schema({
  recipientEmail: { type: String, required: true },
  proposedTimes: { type: [String], required: true },  
  date: { type: Date, required: true },
  location: { type: String, required: true },
  createdBy: { type: String, required: true },
});

const CustomMeeting = mongoose.model("CustomMeeting", CustomMeetingSchema);

module.exports = CustomMeeting;
