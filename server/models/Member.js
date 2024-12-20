// Karl Wehbe & Andre Tandoc

const mongoose = require("mongoose");

// Define User schema
const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true, 
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
