require("dotenv").config();
console.log(process.env.EMAIL_USER); // Should log your Gmail address
console.log(process.env.EMAIL_PASS);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
// const eventRoutes = require("./routes/eventRoutes"); // Path to the event routes
const customMeetingRoutes = require("./routes/customMeetingRoutes"); // Import the custom meeting routes

const corsOptions = {
  origin: ["https://bookify-ten-beige.vercel.app", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies or auth headers
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON data in requests

// Routes
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/appointments", appointmentRoutes); // Appointment routes
// app.use("/api/events", eventRoutes);
app.use("/api/custom-meetings", customMeetingRoutes); // Custom Meeting routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
