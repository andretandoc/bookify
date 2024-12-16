// const mongoose = require("mongoose");

// const MeetingSchema = new mongoose.Schema({
//   event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
//   attendee: {
//     type: new mongoose.Schema({
//       name: { type: String, required: true },
//       email: { type: String, required: true }
//     }),
//     required: true
//   },
//   starttime: { type: String, required: true },
//   endtime: { type: String, required: true },
//   status: { type: String, enum: ["active", "past"], default: "active" }, // Status could be either 'active' or 'past'
//   notes: { type: String }, // Optional notes about the meeting
// });

// module.exports = mongoose.model("Meeting", MeetingSchema);
