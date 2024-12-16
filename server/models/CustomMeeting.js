const mongoose = require("mongoose");

const CustomMeetingSchema = new mongoose.Schema({
  recipientEmail: { type: String, required: true }, // Email of the recipient
  proposedTimes: { type: [Date], required: true }, // Array of proposed times
  message: { type: String }, // Optional message
  date: { type: Date, required: true }, // Date of the meeting
  location: { type: String, required: true }, // Meeting location
  createdBy: { type: String, required: true }, // Email of the user creating the meeting
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }, // Meeting status, not sure if this should be added but GPT mentioned in when provided with implementation
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
});

module.exports = mongoose.model("CustomMeeting", CustomMeetingSchema);
