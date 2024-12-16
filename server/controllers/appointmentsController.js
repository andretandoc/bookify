const Appointment = require("../models/Appointment");
const User = require("../models/Member");
const crypto = require("crypto");

// Fetch appointments based on filters
const getAppointmentsPublic = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      startDate,
      endDate,
      page = 1,
      limit = 5,
    } = req.query;

    let filter = {};

    if (firstName) filter.firstName = new RegExp(firstName, "i"); // case-insensitive
    if (lastName) filter.lastName = new RegExp(lastName, "i");
    if (email) filter.email = new RegExp(email, "i");
    if (startDate && endDate) {
      filter.startDate = { $gte: new Date(startDate) };
      filter.endDate = { $lte: new Date(endDate) };
    }

    // Get the total number of appointments matching the filter
    const totalAppointments = await Appointment.countDocuments(filter);

    // Fetch appointments with pagination
    const appointments = await Appointment.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json({
      totalAppointments,
      currentPage: page,
      totalPages: Math.ceil(totalAppointments / limit),
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAppointmentsPrivate = async (req, res) => {
  try {
    const { email } = req.user; // Assuming email is extracted from the token
    console.log("Fetching appointments for email:", email); // Debugging
    const currentDate = new Date();

    const activeAppointments = await Appointment.find({
      email: email,
      startDate: { $gte: currentDate }, // Future appointments
    });

    const pastAppointments = await Appointment.find({
      email: email,
      startDate: { $lt: currentDate }, // Past appointments
    });
    
    const user = await User.findOne({email : email});
    const name = user.fname || "NA" ;

    console.log("Member :",user)
    console.log("Name:", name);
    console.log("Active private Appointments:", activeAppointments); // Debugging
    console.log("Past private Appointments:", pastAppointments); // Debugging

    res.status(200).json({
      name,
      activeAppointments,
      pastAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};


// For members to create a booking
const createAppointment = async (req, res) => {
  try {
    const { event, host, location, proposedTimes } = req.body;

    // Validate proposedTimes
    if (!proposedTimes || proposedTimes.length === 0) {
      return res.status(400).json({ message: "Proposed times are required." });
    }

    // Generate a unique public URL
    const publicURL = crypto.randomBytes(16).toString("hex");

    const newAppointment = new Appointment({
      event,
      host,
      location,
      startDate: new Date(proposedTimes[0]), // Start date is the first proposed time
      endDate: new Date(proposedTimes[proposedTimes.length - 1]), // End date is the last proposed time
      publicURL,
      email: req.user.email, // Member email (from the token)
      proposedTimes,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment created", publicURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

// For public users to view available bookings
const getAppointmentByPublicURL = async (req, res) => {
  try {
    const { publicURL } = req.params;
    const appointment = await Appointment.findOne({ publicURL });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointment" });
  }
};

const reserveAppointment = async (req, res) => {
  try {
    const { publicURL } = req.params;
    const { firstName, lastName, email } = req.body;

    const appointment = await Appointment.findOne({ publicURL });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.reservedBy) {
      return res.status(400).json({ message: "This slot is already reserved" });
    }

    appointment.reservedBy = email;
    appointment.firstName = firstName;
    appointment.lastName = lastName;
    await appointment.save();

    res.status(200).json({ message: "Appointment reserved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reserve appointment" });
  }
};

module.exports = {
  getAppointmentsPublic,
  getAppointmentsPrivate,
  createAppointment,
  getAppointmentByPublicURL,
  reserveAppointment,
};
