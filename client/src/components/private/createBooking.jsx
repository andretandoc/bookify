/* This is private page for creating a booking ; it should generate a URL -- Coming Soon*/

/* for backend the form here will have the following elements */
/*Class;Type;Professor; Date Range;Time Range */
import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";

const CreateBooking = () => {
  return (
    <div className="cal-box-wrapper">
      {/* Form Row */}
      <form className="form-row">
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
          <input type="date" id="start-date" name="start-date" className="form-input" />
        </label>

        <label htmlFor="end-date">
          End Date:
          <input type="date" id="end-date" name="end-date" className="form-input" />
        </label>

        {/* Time Range */}
        <label htmlFor="start-time">
          Start Time:
          <input type="time" id="start-time" name="start-time" className="form-input" />
        </label>

        <label htmlFor="end-time">
          End Time:
          <input type="time" id="end-time" name="end-time" className="form-input" />
        </label>

        {/* Book Button */}
        <button type="submit" className="double-btn" >
          Book
        </button>
      </form>

      {/* Calendar Box */}
      <div className="cal-box">
        <p style={{ color: "red" }}>Calendar will go here.</p>
      </div>
    </div>
  );
};

export default CreateBooking;

