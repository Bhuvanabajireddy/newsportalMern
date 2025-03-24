// require("dotenv").config(); // Load environment variables from .env
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const userRoutes = require("./routes/userroutes");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Use userRoutes for all API endpoints
// app.use("/api/users", userRoutes);


// // MongoDB Connection (Using .env for security)
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// r



require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userroutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use userRoutes for all API endpoints
app.use("/api/users", userRoutes); // Corrected from userroutes to userRoutes

// MongoDB Connection (Using .env for security)
if (!process.env.MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env file");
  process.exit(1); // Stop server if MONGO_URI is not set
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});