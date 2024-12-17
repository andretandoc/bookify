const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAppointmentsPublic,
  getAppointmentsPrivate,
  getEventByPublicURL,
  reserveAppointment,
  getEvents,
  deleteEvent,
  getPublicEvents,
  getAllEvents,
  getClosestAppointments,
} = require("../controllers/appointmentsController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Fetch public appointments with filters
router.get("/", getAppointmentsPublic);

// Fetch private appointments for a member
router.get("/private", authenticateToken, getAppointmentsPrivate);

// Create a new event (requires authentication)
router.post("/create", authenticateToken, createEvent);

router.delete("/:id", authenticateToken, deleteEvent);

// Fetch events
router.get("/events", authenticateToken, getEvents);

router.get("/allevents", authenticateToken, getAllEvents)

router.get("/closest", authenticateToken, getClosestAppointments)

//Fetch public events
router.get("/public", getPublicEvents);

// Get event details by public URL (public access)
router.get("/:publicURL", getEventByPublicURL);

// Reserve an appointment time slot (public access)
router.post("/:publicURL/reserve", reserveAppointment);

module.exports = router;
