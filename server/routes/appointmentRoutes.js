const express = require("express");
const router = express.Router();
const {
  getAppointmentsPublic,
  getAppointmentsPrivate,
} = require("../controllers/appointmentsController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Get public appointments
router.get("/", getAppointmentsPublic);

// Get private appointments
router.get("/private", authenticateToken, getAppointmentsPrivate);

module.exports = router;
