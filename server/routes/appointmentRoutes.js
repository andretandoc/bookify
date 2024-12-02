const express = require("express");
const router = express.Router();
const { getAppointments } = require("../controllers/appointmentsController");

// Get appointments based on filters
router.get("/", getAppointments);

module.exports = router;
