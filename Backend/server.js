const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./authRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Ensure environment variables are set
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error("❌ Missing Supabase environment variables!");
    process.exit(1);
}

// ✅ Routes
app.use("/auth", authRoutes);

// ✅ Handle Undefined Routes (404)
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
