const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  firstName: { type: String, required: false }, // Public users may not always have a first/last name
  lastName: { type: String, required: false },
  email: { type: String, required: true }, // Member's email who created the booking
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "past"], default: "active" }, // Status of the appointment
  notes: { type: String }, // Optional notes about the meeting
  event: { type: String, required: true },
  host: { type: String, required: true }, // Host of the meeting
  location: { type: String, required: true },
  publicURL: { type: String, required: true, unique: true }, // Unique URL for public access
  reservedBy: { type: String }, // Email of the public user who reserved the meeting
  proposedTimes: { type: [String], required: true }, // Array of proposed time slots
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
