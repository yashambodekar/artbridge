const Submission = require("../models/Submissions");
const Assignment = require("../models/Assignment");
const Course = require("../models/Course");

// @desc    Submit assignment
// @route   POST /api/assignments/submissions/submit/:assignmentId
// @access  Private (Consumer)
exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    // Optional: Check if deadline has passed
    const now = new Date();
    if (assignment.deadline && now > assignment.deadline) {
      return res.status(400).json({ message: "Deadline has passed. Submission closed." });
    }

    const existing = await Submission.findOne({
      assignment: assignmentId,
      consumer: req.user.id,
    });

    if (existing) {
      // Update existing submission
      existing.file = req.file?.path || existing.file;
      existing.submittedAt = Date.now();
      await existing.save();
      return res.status(200).json({ message: "Submission updated", submission: existing });
    }

    // New submission
    const submission = new Submission({
      assignment: assignmentId,
      consumer: req.user.id,
      file: req.file.path,
    });

    await submission.save();
    res.status(201).json({ message: "Assignment submitted", submission });
  } catch (err) {
    console.error("Submit Assignment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get consumer's own submission for assignment
// @route   GET /api/assignments/submissions/my/:assignmentId
// @access  Private (Consumer)
exports.getMySubmission = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submission = await Submission.findOne({
      assignment: assignmentId,
      consumer: req.user.id,
    });

    if (!submission) {
      return res.status(404).json({ message: "No submission found" });
    }

    res.json(submission);
  } catch (err) {
    console.error("Get My Submission Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
