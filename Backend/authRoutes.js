const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// ✅ User Signup Route
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Enforce default role to prevent tampering
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { role: "user" } }, // Default role
        });

        if (error) {
            console.error("Signup Error:", error.message);
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ message: "Signup successful! Please verify your email." });
    } catch (err) {
        console.error("Unexpected Signup Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ User Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error("Login Error:", error.message);
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.json({
            message: "Login successful!",
            token: data.session.access_token,
            refresh_token: data.session.refresh_token, // Store securely
        });
    } catch (err) {
        console.error("Unexpected Login Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
