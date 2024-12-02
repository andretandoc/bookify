const express = require("express");
const router = express.Router();
const {
  registerMember,
  loginMember,
} = require("../controllers/authController");

// Register route
router.post("/register", registerMember);

// Login route
router.post("/login", loginMember);

module.exports = router;
