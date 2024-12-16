const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({ //might need to add more
  title: { type: String, required: true},
  host: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  endDate: { type: Date, required: true},
  time: { type: String, required: true },
  location: { type: String, required: true },
  timeslots: [{ type: [String], required: true}], // Array of Meeting references
  notes: { type: String }, // Optional notes about the meeting
  publicURL: { type: String, required: true, unique: true }, // Unique URL for public access
  privacy: { type: String, enum:["private", "public"], default: "public", required: true}
});

module.exports = mongoose.model("Event", EventSchema);
