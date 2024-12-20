const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["One-Time", "Recurring"], required: true },
  location: { type: String, required: true },
  privacy: { type: String, enum: ["Public", "Members-Only"], required: true },

  startDate: { type: Date, required: true },
  endDate: { type: Date },
  createdBy: { type: String, required: true }, 
  publicURL: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Event", EventSchema);
