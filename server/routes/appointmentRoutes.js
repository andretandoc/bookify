const express = require("express");
const router = express.Router();
const {
  getAppointmentsPublic,
  getAppointmentsPrivate,
  createAppointment,
  getAppointmentByPublicURL,
  reserveAppointment,
} = require("../controllers/appointmentsController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Get appointments (public)
router.get("/", getAppointmentsPublic);

// Get appointments (private)
router.get("/private", authenticateToken, getAppointmentsPrivate);

// Create appointments
router.post("/create", authenticateToken, createAppointment);

// View and reserve appointment (public)
router.get("/:publicURL", getAppointmentByPublicURL);
router.post("/:publicURL/reserve", reserveAppointment);

module.exports = router;
