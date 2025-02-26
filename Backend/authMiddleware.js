const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  let token = req.header("Authorization");

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; // Extract token
  } else if (req.cookies?.token) {
    token = req.cookies.token; // Allow token from cookies (optional)
  } else {
    return res.status(401).json({ message: "Unauthorized: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    console.error("JWT Authentication Error:", err.message);
    return res.status(403).json({ message: "Forbidden: Invalid or expired token." });
  }
};

module.exports = authenticateJWT;
