import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import axios from "axios";

const CreateBookingOld = () => {
  const [formData, setFormData] = useState({
    class: "",
    type: "",
    professor: "",
    location: "",
  });
  const [dateRange, setDateRange] = useState([new Date(), new Date()]); // Start and End Dates
  const [timeRange, setTimeRange] = useState({
    startTime: "",
    endTime: "",
  });
  const [message, setMessage] = useState("");
  const [publicURL, setPublicURL] = useState("");

  // Update Form Data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update Date Range Based on Calendar Selection
  const handleCalendarChange = (range) => {
    setDateRange(range);
  };

  // Update Date Inputs
  const handleDateInputChange = (event) => {
    const { name, value } = event.target;
    const newDate = new Date(value);

    if (name === "startDate") {
      setDateRange((prev) => [newDate, prev[1]]);
    } else if (name === "endDate") {
      setDateRange((prev) => [prev[0], newDate]);
    }
  };

  // Update Time Range
  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setTimeRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Combine form data with date and time ranges
    const bookingData = {
      ...formData,
      startDate: new Date(
        `${dateRange[0].toISOString().split("T")[0]}T${timeRange.startTime}`
      ),
      endDate: new Date(
        `${dateRange[1].toISOString().split("T")[0]}T${timeRange.endTime}`
      ),
    };

    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${API_URL}/api/appointments/create`,
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Booking created successfully!");
      setPublicURL(response.data.publicURL); // Backend should send a unique public URL
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to create booking. Try again."
      );
    }
  };

  return (
    <div className="cal-box-wrapper">
      {/* Form Row */}
      <form className="form-row" onSubmit={handleSubmit}>
        {/* Class Dropdown */}
        <label htmlFor="class">
          Class:
          <select
            id="class"
            name="class"
            className="form-input"
            value={formData.class}
            onChange={handleChange}
            required
          >
            <option value="">Select a Class</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            <option value="class3">Class 3</option>
          </select>
        </label>

        {/* Type Dropdown */}
        <label htmlFor="type">
          Type:
          <select
            id="type"
            name="type"
            className="form-input"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
        </label>

        {/* Professor Dropdown */}
        <label htmlFor="professor">
          Professor:
          <select
            id="professor"
            name="professor"
            className="form-input"
            value={formData.professor}
            onChange={handleChange}
            required
          >
            <option value="">Select a Professor</option>
            <option value="prof1">Professor 1</option>
            <option value="prof2">Professor 2</option>
            <option value="prof3">Professor 3</option>
          </select>
        </label>

        {/* Location */}
        <label htmlFor="location">
          Location:
          <input
            type="text"
            id="location"
            name="location"
            className="form-input"
            placeholder="Enter Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        {/* Date Range */}
        <label htmlFor="startDate">
          Start Date:
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="form-input"
            value={dateRange[0]?.toISOString().split("T")[0] || ""}
            onChange={handleDateInputChange}
            required
          />
        </label>

        <label htmlFor="endDate">
          End Date:
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="form-input"
            value={dateRange[1]?.toISOString().split("T")[0] || ""}
            onChange={handleDateInputChange}
            required
          />
        </label>

        {/* Time Range */}
        <label htmlFor="startTime">
          Start Time:
          <input
            type="time"
            id="startTime"
            name="startTime"
            className="form-input"
            value={timeRange.startTime}
            onChange={handleTimeChange}
            required
          />
        </label>

        <label htmlFor="endTime">
          End Time:
          <input
            type="time"
            id="endTime"
            name="endTime"
            className="form-input"
            value={timeRange.endTime}
            onChange={handleTimeChange}
            required
          />
        </label>

        {/* Book Button */}
        <button type="submit" className="double-btn">
          Book
        </button>
      </form>

      {/* Calendar Box */}
      <div className="cal-box">
        <Calendar
          selectRange={true}
          onChange={handleCalendarChange}
          value={dateRange}
        />
      </div>

      {/* Display Booking Public URL */}
      {publicURL && (
        <div>
          <h3>Booking Created Successfully!</h3>
          <p>Share this public URL:</p>
          <a href={`http://localhost:5173/public/${publicURL}`}>
            {`http://localhost:5173/public/${publicURL}`}
          </a>
        </div>
      )}

      {/* Display Message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateBookingOld;
