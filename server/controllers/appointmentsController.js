const Event = require("../models/Event");
const Appointment = require("../models/Appointment");
const User = require("../models/Member");
const crypto = require("crypto");

const getEvents = async (req, res) => {
  try {
    // Log the user from the token
    console.log("Request user:", req.user);

    const { type, privacy, startDate, endDate, createdBy } = req.query;

    // Build the query filter object
    let filter = {};

    if (type) filter.type = type; // Filter by event type
    if (privacy) filter.privacy = privacy; // Filter by event privacy
    if (createdBy) filter.createdBy = createdBy; // Filter by creator email
    if (startDate && endDate) {
      filter.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) }; // Date range filter
    } else if (startDate) {
      filter.startDate = { $gte: new Date(startDate) }; // Events starting after the date
    }

    // Debug the filter being passed to the database query
    console.log("Query filter:", filter);

    const currentDate = new Date();

    // Fetch events based on filters
    const events = await Event.find(filter).sort({ startDate: 1 }); // Sort by startDate ascending

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found." });
    }

    // Separate active and past events
    const activeEvents = events.filter(
      (event) => event.endDate && new Date(event.endDate) >= currentDate
    );
    const pastEvents = events.filter(
      (event) => event.endDate && new Date(event.endDate) < currentDate
    );

    // Respond with active and past events
    res.status(200).json({ activeEvents, pastEvents });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events." });
  }
};

const createEvent = async (req, res) => {
  try {
    const {
      title,
      type,
      location,
      privacy,
      startDate,
      endDate,
      recurrence,
      timeslots,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !location ||
      !privacy ||
      !startDate ||
      timeslots.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Validate timeslots (HH:MM format)
    const isValidTimeslots = timeslots.every((slot) =>
      /^\d{2}:\d{2}$/.test(slot)
    );
    if (!isValidTimeslots) {
      return res
        .status(400)
        .json({ message: "Invalid time slot format. Use HH:MM." });
    }

    // Extract user email from token (middleware injects req.user)
    const createdBy = req.user.email;

    // Generate a public URL
    const publicURL = crypto.randomBytes(16).toString("hex");

    // Create the Event
    const newEvent = new Event({
      title,
      type,
      location,
      privacy,
      startDate,
      endDate: type === "Recurring" ? endDate : startDate,
      publicURL,
      createdBy,
    });
    await newEvent.save();

    // Generate Appointments
    let appointments = [];
    const baseDate = new Date(startDate);
    const finalDate = new Date(endDate);

    if (type === "Recurring") {
      // Recurring logic: Weekly or Monthly
      let currentDate = new Date(baseDate);

      while (currentDate <= finalDate) {
        timeslots.forEach((slot) => {
          const [hours, minutes] = slot.split(":");
          const appointmentTime = new Date(currentDate);
          appointmentTime.setHours(hours, minutes, 0, 0);

          if (!isNaN(appointmentTime)) {
            appointments.push({
              eventId: newEvent._id,
              time: appointmentTime,
            });
          }
        });

        // Increment the date for next recurrence
        if (recurrence === "Weekly") {
          currentDate.setDate(currentDate.getDate() + 7);
        } else if (recurrence === "Monthly") {
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      }
    } else {
      // One-Time Event Logic
      timeslots.forEach((slot) => {
        const [hours, minutes] = slot.split(":");
        const appointmentTime = new Date(startDate);
        appointmentTime.setHours(hours, minutes, 0, 0);

        appointments.push({
          eventId: newEvent._id,
          time: appointmentTime,
        });
      });
    }

    // Insert Appointments into the Database
    if (appointments.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid appointment times were generated." });
    }

    await Appointment.insertMany(appointments);

    res.status(201).json({
      message: "Event and appointments created successfully.",
      publicURL: `${publicURL}`,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event." });
  }
};

// Fetch appointments based on filters
const getAppointmentsPublic = async (req, res) => {
  try {
    const { email, startDate, endDate } = req.query;
  
    const currentDate = new Date(); // Current date for comparison
  
    // Build the filter dynamically based on provided parameters
    let filter = {};


    if (firstName) filter.firstName = new RegExp(firstName, "i"); // case-insensitive
    if (lastName) filter.lastName = new RegExp(lastName, "i");
    if (email) filter.email = new RegExp(email, "i");
    if (startDate && endDate) {
      filter.startDate = { $gte: new Date(startDate) };
      filter.endDate = { $lte: new Date(endDate) };
    }

    if (email) filter.email = new RegExp(email, "i"); // Case-insensitive search
    if (startDate) filter.startDate = { $gte: new Date(startDate) };
    if (endDate) filter.endDate = { ...filter.endDate, $lte: new Date(endDate) };
  
    // Fetch all appointments matching the filter
    const appointments = await Appointment.find(filter);
  
    // Split appointments into active and past categories
    const activeAppointments = appointments.filter(
      (appointment) => new Date(appointment.startDate) >= currentDate
    );
    const pastAppointments = appointments.filter(
      (appointment) => new Date(appointment.startDate) < currentDate
    );
  
    // Debugging logs
    console.log("Active Appointments:", activeAppointments);
    console.log("Past Appointments:", pastAppointments);
  
    // Handle the case where no appointments were found
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

  
    // Return the categorized appointments
    res.status(200).json({
      activeAppointments,
      pastAppointments,
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

    const user = await User.findOne({ email: email });
    const name = user.fname || "NA";

    console.log("Member :", user);
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
// const createAppointment = async (req, res) => {
//   try {
//     const { event, host, location, proposedTimes } = req.body;

//     // Validate proposedTimes
//     if (!proposedTimes || proposedTimes.length === 0) {
//       return res.status(400).json({ message: "Proposed times are required." });
//     }

//     // Generate a unique public URL
//     const publicURL = crypto.randomBytes(16).toString("hex");

//     const newAppointment = new Appointment({
//       event,
//       host,
//       location,
//       startDate: new Date(proposedTimes[0]), // Start date is the first proposed time
//       endDate: new Date(proposedTimes[proposedTimes.length - 1]), // End date is the last proposed time
//       publicURL,
//       email: req.user.email, // Member email (from the token)
//       proposedTimes,
//     });

//     await newAppointment.save();
//     res.status(201).json({ message: "Appointment created", publicURL });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to create appointment" });
//   }
// };

// For public users to view available bookings
const getEventByPublicURL = async (req, res) => {
  try {
    const { publicURL } = req.params;

    // Find the Event using publicURL
    const event = await Event.findOne({ publicURL });
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Fetch available appointments for the Event
    const availableAppointments = await Appointment.find({
      eventId: event._id,
      reservedBy: null, // Only fetch unreserved slots
    });

    res.status(200).json({
      eventDetails: event,
      availableAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch appointments." });
  }
};

const reserveAppointment = async (req, res) => {
  try {
    const { publicURL } = req.params;
    const { firstName, lastName, email, timeSlotId } = req.body;

    // Find the Event using publicURL
    const event = await Event.findOne({ publicURL });
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Find the specific Appointment
    const appointment = await Appointment.findOne({
      _id: timeSlotId,
      eventId: event._id,
      reservedBy: null, // Ensure the slot is not already reserved
    });

    if (!appointment) {
      return res.status(400).json({ message: "Time slot unavailable." });
    }

    // Update the Appointment with attendee details
    appointment.reservedBy = { firstName, lastName, email };
    await appointment.save();

    res.status(200).json({ message: "Time slot reserved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reserve time slot." });
  }
};

module.exports = {
  getAppointmentsPublic,
  getAppointmentsPrivate,
  createEvent,
  getEventByPublicURL,
  reserveAppointment,
  getEvents,
};
