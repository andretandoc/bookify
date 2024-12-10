/* This is private page for creating a booking ; it should generate a URL -- Coming Soon*/

/* for backend the form here will have the following elements */
/*Class;Type;Professor; Date Range;Time Range */
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles

const CreateBooking = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]); // Start and End Dates
  const [timeRange, setTimeRange] = useState({
    startTime: "",
    endTime: "",
  });

  // Update Date Range Based on Calendar Selection
  const handleCalendarChange = (range) => {
    setDateRange(range);
  };

  // Update Date Inputs
  const handleDateInputChange = (event) => {
    const { name, value } = event.target;
    const newDate = new Date(value);

    if (name === "start-date") {
      setDateRange((prev) => [newDate, prev[1]]);
    } else if (name === "end-date") {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Date Range:", dateRange);
    console.log("Time Range:", timeRange);
  };

  return (
    <div className="cal-box-wrapper">
      {/* Form Row */}
      <form className="form-row" onSubmit={handleSubmit}>
        {/* Class Dropdown */}
        <label htmlFor="class">
          Class:
          <select id="class" name="class" className="form-input">
            <option value="">Select a Class</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            <option value="class3">Class 3</option>
          </select>
        </label>

        {/* Type Dropdown */}
        <label htmlFor="type">
          Type:
          <select id="type" name="type" className="form-input">
            <option value="">Select a Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
        </label>

        {/* Professor Dropdown */}
        <label htmlFor="professor">
          Professor:
          <select id="professor" name="professor" className="form-input">
            <option value="">Select a Professor</option>
            <option value="prof1">Professor 1</option>
            <option value="prof2">Professor 2</option>
            <option value="prof3">Professor 3</option>
          </select>
        </label>

        {/* Date Range */}
        <label htmlFor="start-date">
          Start Date:
          <input
            type="date"
            id="start-date"
            name="start-date"
            className="form-input"
            value={dateRange[0]?.toISOString().split("T")[0] || ""}
            onChange={handleDateInputChange}
          />
        </label>

        <label htmlFor="end-date">
          End Date:
          <input
            type="date"
            id="end-date"
            name="end-date"
            className="form-input"
            value={dateRange[1]?.toISOString().split("T")[0] || ""}
            onChange={handleDateInputChange}
          />
        </label>

        {/* Time Range */}
        <label htmlFor="start-time">
          Start Time:
          <input
            type="time"
            id="start-time"
            name="startTime"
            className="form-input"
            value={timeRange.startTime}
            onChange={handleTimeChange}
          />
        </label>

        <label htmlFor="end-time">
          End Time:
          <input
            type="time"
            id="end-time"
            name="endTime"
            className="form-input"
            value={timeRange.endTime}
            onChange={handleTimeChange}
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
    </div>
  );
};

export default CreateBooking;

