const Appointment = require("../models/Appointment");

// Fetch appointments based on filters
const getAppointments = async (req, res) => {
  try {
    const { firstName, lastName, email, startDate, endDate } = req.query;

    let filter = {};

    if (firstName) filter.firstName = new RegExp(firstName, "i"); // case-insensitive
    if (lastName) filter.lastName = new RegExp(lastName, "i");
    if (email) filter.email = new RegExp(email, "i");
    if (startDate && endDate) {
      filter.startDate = { $gte: new Date(startDate) };
      filter.endDate = { $lte: new Date(endDate) };
    }

    const appointments = await Appointment.find(filter);

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAppointments };