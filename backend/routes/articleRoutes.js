const express = require("express");
const router = express.Router();
const Article = require("../models/Article"); // Assuming you have an Article model

// Sample route to fetch all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
