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
  cancelPublicAppointment,
  cancelPrivateAppointment,
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

router.get("/allevents", authenticateToken, getAllEvents);

router.get("/closest", authenticateToken, getClosestAppointments);

router.delete("/cancelpublic/:id", cancelPublicAppointment);

router.delete("/cancelprivate/:id", authenticateToken, cancelPrivateAppointment)

router.get("/public", getPublicEvents);

router.get("/:publicURL", getEventByPublicURL);

router.post("/:publicURL/reserve", reserveAppointment);

module.exports = router;
