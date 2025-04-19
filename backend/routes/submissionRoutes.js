const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  submitAssignment,
  getMySubmission,
} = require("../controllers/submissionController");

// ✅ Consumer submits assignment
router.post("/submit/:assignmentId", protect, upload.single("file"), submitAssignment);

// ✅ Consumer views their submission
router.get("/my/:assignmentId", protect, getMySubmission);

module.exports = router;
