const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  uploadCourseContent,
  updateCourseContent,
  deleteCourseContent,
  getAllContentsForCourse,
} = require("../controllers/courseContentController");

// Upload course content
router.post("/:courseId", protect, upload.array("files", 10), uploadCourseContent);

// Update course content
router.put("/:contentId", protect, upload.array("files", 10), updateCourseContent);

// Delete course content
router.delete("/:contentId", protect, deleteCourseContent);

// Get all course content for a specific course (public)
router.get("/public/:courseId", getAllContentsForCourse);

module.exports = router;