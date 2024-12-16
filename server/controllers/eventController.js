const Appointment = require("../models/Appointment");
const Event = require("../models/Event");
const User = require("../models/Member");
const crypto = require("crypto");

const createEvent = async (req, res) => {
    try {
        
        // Assuming email is extracted from the token
        const { title, startDate, endDate, location, timeslots, privacy, type} = req.body;
      
        if (!timeslots || timeslots.length === 0) {
            return res.status(400).json({ message: "Proposed times are required." });
        }

        console.log(req.user)
        const email = req.user.email; 
        
        const user = await User.findOne({email : email});
        const fname = user.fname || "NA" ;
        const lname = user.lname;
        const host = `${fname} ${lname}`;

        const publicURL = crypto.randomBytes(16).toString("hex");

        const newEvent = new Event({
            title,
            host,
            email,
            startDate,
            endDate,
            location,
            timeslots,
            publicURL,
            privacy,
          });

          await newEvent.save();
          res.status(201).json({ message: "Event created", publicURL });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Failed to create event" });
        }
    };



// Fetch events for a member
const getMemberEvents = async (req, res) => {
    try {
      const { email } = req.user; // Assuming email is extracted from the token
      console.log("Fetching events for email:", email); // Debugging
      const currentDate = new Date();
  
      const activeEvents = await Event.find({
        email: email,
        date: { $gte: currentDate }, // Future appointments
      });
  
      const pastEvents = await Event.find({
        email: email,
        date: { $lt: currentDate }, // Past appointments
      });
      
    
      console.log("Active private Events:", activeEvents); // Debugging
      console.log("Past private Events:", pastEvents); // Debugging
  
      res.status(200).json({
        activeEvents,
        pastEvents,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  };


  module.exports = {
    createEvent,
    getMemberEvents,
  };