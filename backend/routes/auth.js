const express = require("express");
const bcrypt = require("bcryptjs"); // Use bcryptjs consistently
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

// Function to verify password
async function verifyPassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
}

// Login Route
const bcrypt = require("bcryptjs");

// Login Route
router.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Debugging password comparison
        console.log("🔹 Stored Hashed Password:", user.password);
        console.log("🔹 Entered Password:", password);

        // Compare passwords using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.json({ message: "Login successful" });

    } catch (err) {
        console.error("🔥 Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
