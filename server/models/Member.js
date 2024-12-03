const mongoose = require("mongoose");

// Define User schema
const UserSchema = new mongoose.Schema({
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

// Create User model based on defined schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
