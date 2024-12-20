// Saif Al-Alami 

const express = require("express");
const router = express.Router();
const {
  createCustomMeeting,
  getCustomMeetings,
  updateCustomMeeting,
  deleteCustomMeeting,
} = require("../controllers/customMeetingController");
const { authenticateToken } = require("../middleware/authMiddleware"); // To secure routes

// Create a new custom meeting
router.post("/", authenticateToken, createCustomMeeting);

// Get all custom meetings for the logged-in user
router.get("/", authenticateToken, getCustomMeetings);

// Update an existing custom meeting
router.put("/:id", authenticateToken, updateCustomMeeting);

// Delete a custom meeting
router.delete("/:id", authenticateToken, deleteCustomMeeting);

module.exports = router;
