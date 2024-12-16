const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Token received:", token); // Debugging

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("Token verified:", verified); // Debugging
    next();
  } catch (error) {
    console.error("Token verification failed:", error); // Debugging
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = { authenticateToken };
