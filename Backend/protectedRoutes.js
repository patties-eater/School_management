const express = require("express");
const authenticateJWT = require("./authMiddleware");
const authorizeRole = require("./roleMiddleware");

const router = express.Router();

// Protected Route (Only authenticated users)
router.get("/dashboard", authenticateJWT, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}!`, role: req.user.role });
});

// Admin Only Route
router.get("/admin", authenticateJWT, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;
