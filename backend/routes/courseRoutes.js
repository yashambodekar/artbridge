const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const mongoose = require("mongoose");
const {
  addCourse,
  deleteCourse,
  getMyCourses,
  getAllCourses,
  buyCourse,
  getCourseById,
  getPurchasedCourses,
} = require("../controllers/courseController");

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
};

// ✅ Get all courses purchased by the consumer
router.get("/purchased", protect, getPurchasedCourses);

// ✅ Get courses of logged-in artisan
router.get("/my", protect, getMyCourses);

// ✅ Get all courses
router.get("/AllCourses", getAllCourses);

// ✅ Add a new course
router.post("/", protect,upload.single("image"), addCourse);

// ✅ Buy a course
router.post("/buy/:courseId", protect, buyCourse);

// ✅ Delete a course
router.delete("/:id", protect,upload.single("image"), deleteCourse);

// ✅ Get course by ID (must be the last route to avoid conflicts)
router.get("/:id", validateObjectId, getCourseById);

module.exports = router;