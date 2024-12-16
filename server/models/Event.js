const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["One-Time", "Recurring"], required: true },
  location: { type: String, required: true },
  privacy: { type: String, enum: ["Public", "Members-Only"], required: true },

  startDate: { type: Date, required: true },
  endDate: { type: Date },
  createdBy: { type: String, required: true }, // Member email or ID who created event
  publicURL: { type: String, required: true, unique: true },
  // host: { type: String, required: true },
  // status: { type: String, enum: ["active", "past"], default: "active" }, // Status could be either 'active' or 'past'
  // notes: { type: String }, // Optional notes about the event
});

module.exports = mongoose.model("Event", EventSchema);
