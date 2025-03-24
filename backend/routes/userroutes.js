// const express = require("express");
// const bcrypt = require("bcryptjs"); // Ensure you're using bcryptjs consistently
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const router = express.Router();

// // 🔹 Signup Route
// router.post("/signup", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create user
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully!" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // 🔹 Login Route
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Find user
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id }, "yourSecretKey", { expiresIn: "1h" });

//         res.status(200).json({
//             message: "Login successful",
//             token,
//             user: { id: user._id, name: user.name, email: user.email },
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// module.exports = router;


// 





const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/userModel");
require("dotenv").config();

const router = express.Router();

// 🔹 Helper Function for Error Handling
const handleError = (res, status, message, errors = null) => {
  console.error(`🔥 Error: ${message}`);
  
  const responseBody = { 
    message: message,
    ...(errors && { errors: errors })
  };

  return res.status(status).json(responseBody);
};

// 🔹 Signup Validation Middleware
const signupValidation = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3, max: 20 }).withMessage("Username must be 3-20 characters long")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),
  
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),
  
  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

// 🔹 Signup Route
router.post("/signup", signupValidation, async (req, res) => {
  // Log incoming request for debugging
  console.log("🔍 Signup Request Body:", req.body);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validation Errors:", errors.array());
    return handleError(res, 400, "Validation failed", errors.array());
  }

  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return handleError(res, 400, "Email already in use");
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return handleError(res, 400, "Username already in use");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword 
    });

    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully!", 
      userId: newUser._id 
    });

  } catch (error) {
    console.error("🔥 Signup Server Error:", error);
    return handleError(res, 500, "Internal server error", error.message);
  }
});

// 🔹 Login Validation Middleware
const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),
  
  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
];

// 🔹 Login Route
router.post("/login", loginValidation, async (req, res) => {
  // Log incoming request for debugging
  console.log("🔍 Login Request Body:", req.body);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validation Errors:", errors.array());
    return handleError(res, 400, "Validation failed", errors.array());
  }

  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return handleError(res, 400, "User not found");
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return handleError(res, 400, "Invalid credentials");
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.error("🔥 Missing JWT_SECRET in environment variables");
      return handleError(res, 500, "Server misconfiguration: Missing JWT_SECRET");
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email 
      },
    });

  } catch (error) {
    console.error("🔥 Login Server Error:", error);
    return handleError(res, 500, "Internal server error", error.message);
  }
});

// 🔹 Basic Route for Testing
router.get("/", (req, res) => {
  res.send("✅ User routes are working!");
});

module.exports = router;