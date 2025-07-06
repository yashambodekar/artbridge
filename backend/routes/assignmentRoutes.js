const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createAssignment,
  deleteAssignment,
  getAssignmentsForCourse,
  getSubmissionsForAssignment,
} = require("../controllers/assignmentController");

// ✅ Upload a new assignment (with file and deadline)
router.post("/:courseId", protect, upload.single("file"), createAssignment);

// ✅ Delete assignment
router.delete("/:assignmentId", protect, deleteAssignment);

// ✅ Get all assignments for a course
router.get("/:courseId/assignments", protect, getAssignmentsForCourse);

// ✅ Get submissions for a particular assignment
router.get("/:assignmentId/submissions", protect, getSubmissionsForAssignment);

module.exports = router;
