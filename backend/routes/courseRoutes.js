// routes/courseRoutes.js
const express = require("express");
const Course = require("../models/Course");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Add Course
router.post("/add", protect, async (req, res) => {
    const { name, image, price, description, mode } = req.body;
    try {
        const course = new Course({ artisan: req.user.id, name, image, price, description, mode });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get Artisan's Courses
router.get("/my-courses", protect, async (req, res) => {
    try {
        const courses = await Course.find({ artisan: req.user.id });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
