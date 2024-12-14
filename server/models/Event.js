const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  host: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["active", "past"], default: "active" }, // Status could be either 'active' or 'past'
  meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meeting" }], // Array of Meeting references
  notes: { type: String }, // Optional notes about the meeting
  privacy: { type: String, enum:["members", "public"], default: "public", required: true}
});

module.exports = mongoose.model("Event", EventSchema);
