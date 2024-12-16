const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  }, // Links to the Event
  time: { type: Date, required: true }, // Specific time slot
  reservedBy: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
