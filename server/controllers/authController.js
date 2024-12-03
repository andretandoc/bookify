const Member = require("../models/Member");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new member
const registerMember = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(mcgill\.ca|mail\.mcgill\.ca)$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email. Please use a McGill email address.",
      });
    }

    // Check if member already exists in db
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: "Member already exists" });
    }

    // Hash the password before saving Member to db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new member using Member model
    const newMember = new Member({ email, password: hashedPassword });
    await newMember.save(); // Save member to db

    res.status(201).json({ message: "Member registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login member
const loginMember = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the member by email
    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare provided password with hashed password in db
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token if password is correct
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerMember, loginMember };
