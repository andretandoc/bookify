const express = require("express");
const router = express.Router();
const {
  registerMember,
  loginMember,
} = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");
//console.log(typeof authenticateToken);

// Register route
router.post("/register", registerMember);

// Login route
router.post("/login", loginMember);

router.get("/private-data", authenticateToken, (req, res) => {
  res.json({ message: "This is private data only for logged-in users." });
});

module.exports = router;
