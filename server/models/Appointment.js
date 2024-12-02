const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "past"], default: "active" }, // Status could be either 'active' or 'past'
  notes: { type: String }, // Optional notes about the meeting
});

module.exports = mongoose.model("Appointment", appointmentSchema);
