const Event = require("../models/Event");
const Appointment = require("../models/Appointment");
const User = require("../models/Member");
const crypto = require("crypto");

const getEvents = async (req, res) => {
  try {
    console.log("Request user:", req.user);

    const { type, privacy, startDate, endDate } = req.query;

    const createdBy = req.user.email; 

    let filter = { createdBy }; 

    if (type) filter.type = type; 
    if (privacy) filter.privacy = privacy; 
    if (startDate && endDate) {
      filter.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) }; 
    } else if (startDate) {
      filter.startDate = { $gte: new Date(startDate) }; 
    }


    const currentDate = new Date();

    const events = await Event.find(filter).sort({ startDate: 1 }); 

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found." });
    }

    const activeEvents = events.filter(
      (event) => event.endDate && new Date(event.endDate) >= currentDate
    );
    const pastEvents = events.filter(
      (event) => event.endDate && new Date(event.endDate) < currentDate
    );

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

    if (
      !title ||
      !location ||
      !privacy ||
      !startDate ||
      timeslots.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const isValidTimeslots = timeslots.every((slot) =>
      /^\d{2}:\d{2}$/.test(slot)
    );
    if (!isValidTimeslots) {
      return res
        .status(400)
        .json({ message: "Invalid time slot format. Use HH:MM." });
    }

    const createdBy = req.user.email;

    const publicURL = crypto.randomBytes(16).toString("hex");

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

    let appointments = [];
    const baseDate = new Date(startDate);
    const finalDate = new Date(endDate);

    if (type === "Recurring") {
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

        if (recurrence === "Weekly") {
          currentDate.setDate(currentDate.getDate() + 7);
        } else if (recurrence === "Monthly") {
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      }
    } else {
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

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params; 

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    await Event.findByIdAndDelete(id);

    await Appointment.deleteMany({ eventId: id });

    res.status(200).json({
      message: "Event and all associated appointments deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete the event." });
  }
};

const getPublicEvents = async (req, res) => {
  try {
    const { privacy } = req.query;
    if (privacy) filter.privacy = privacy; 
    const publicEvents = await Event.find({ privacy: "Public" });

    if (publicEvents.length === 0) {
      return res.status(404).json({ message: "No public events found." });
    }

    console.log("Public events = ", publicEvents);

    res.status(200).json({ publicEvents });
  } catch (error) {
    console.error("Error fetching public events:", error);
    res.status(500).json({ message: "Failed to retrieve public events." });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const allEvents = await Event.find({ startDate: { $gte: today } });

    if (allEvents.length === 0) {
      return res.status(404).json({ message: "No events found." });
    }


    res.status(200).json({ allEvents });
  } catch (error) {
    console.error("Error fetching all events:", error);
    res.status(500).json({ message: "Failed to retrieve events." });
  }
};


const getAppointmentsPublic = async (req, res) => {
  try {
    const { email, startDate, endDate } = req.query;

    const currentDate = new Date(); 

    let filter = {};

    if (email) {
      filter["reservedBy.email"] = new RegExp(email.trim(), "i");
    }

    if (startDate) {
      filter.time = { $gte: new Date(startDate) };
    }

    if (endDate) {
      filter.time = filter.time
        ? { ...filter.time, $lte: new Date(endDate) }
        : { $lte: new Date(endDate) };
    }

    console.log("Filter used for query:", filter);

    const appointments = await Appointment.find(filter).populate("eventId", "title createdBy startDate location");

    const activeAppointments = appointments.filter(
      (appointment) => new Date(appointment.time) >= currentDate
    );
    const pastAppointments = appointments.filter(
      (appointment) => new Date(appointment.time) < currentDate
    );

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json({
      activeAppointments,
      pastAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};


const getClosestAppointments = async (req, res) => {
  try {
    const { email } = req.user; 
    console.log("Fetching appointments for email:", email); 

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const name = user.fname || "NA"; 

    const currentDate = new Date();

    const closestAppointments = await Appointment.find({
      email: email, 
      startDate: { $gte: currentDate }, 
    })
      .sort({ startDate: 1 }) 
      .limit(4);

    if (closestAppointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No upcoming appointments found." });
    }

    console.log("Closest appointments:", closestAppointments);

    res.status(200).json({
      name,
      closestAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

const getAppointmentsPrivate = async (req, res) => {
  try {
    const { email } = req.user; 
    console.log("Fetching appointments for email:", email); 
    const currentDate = new Date();

    const activeAppointments = await Appointment.find({
      "reservedBy.email": email,
      time: { $gte: currentDate }, 
    }).populate("eventId", "title createdBy startDate location");

    const pastAppointments = await Appointment.find({
      "reservedBy.email": email,
      time: { $lt: currentDate },
    }).populate("eventId", "title createdBy startDate location");

    const user = await User.findOne({ email: email });
    const name = user.fname || "NA";

    console.log("Member :", user);
    console.log("Name:", name);
    console.log("Active private Appointments:", activeAppointments); 
    console.log("Past private Appointments:", pastAppointments); 

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

const cancelPublicAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findOne({ _id: appointmentId });

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found or already canceled" });
    }

    console.log("Found appointment:", appointment);

    appointment.reservedBy = null;
    await appointment.save();

    res.status(200).json({
      message: "Public appointment successfully canceled and deleted",
    });
  } catch (error) {
    console.error("Error canceling public appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const cancelPrivateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { email } = req.user;

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      "reservedBy.email": email,
    });

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found or unauthorized to cancel" });
    }

    appointment.reservedBy = null;
    await appointment.save();

    res.status(200).json({
      message: "Private appointment successfully canceled and marked as available",
    });
  } catch (error) {
    console.error("Error canceling private appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// For public users to view available bookings
const getEventByPublicURL = async (req, res) => {
  try {
    const { publicURL } = req.params;

    const event = await Event.findOne({ publicURL });
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const availableAppointments = await Appointment.find({
      eventId: event._id,
      reservedBy: null, 
    });

    res.status(200).json({
      eventDetails: event,
      availableAppointments,
      privacy: event.privacy, 
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

    const event = await Event.findOne({ publicURL });
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const appointment = await Appointment.findOne({
      _id: timeSlotId,
      eventId: event._id,
      reservedBy: null, 
    });

    if (!appointment) {
      return res.status(400).json({ message: "Time slot unavailable." });
    }

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
  deleteEvent,
  getPublicEvents,
  getAllEvents,
  getClosestAppointments,
  cancelPublicAppointment,
  cancelPrivateAppointment,
};
