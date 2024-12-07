require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from frontend running on port 5173
app.use(express.json()); // Parse JSON data in requests

// Routes
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/appointments", appointmentRoutes); // Auth routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Login authentication : 
app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});