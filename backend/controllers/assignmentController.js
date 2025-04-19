const Assignment = require("../models/Assignment");
const Submission = require("../models/Submissions");

// ✅ POST /api/assignments/:courseId → Create assignment
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const { courseId } = req.params;
    const file = req.file?.path;

    if (!title || !deadline || !file) {
      return res.status(400).json({ message: "Title, file, and deadline are required." });
    }

    const assignment = new Assignment({
      course: courseId,
      title,
      description,
      deadline,
      file,
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    console.error("Create assignment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ PUT /api/assignments/:assignmentId → Update assignment
exports.updateAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { title, description, deadline } = req.body;
    const file = req.file?.path;

    const updateFields = { title, description, deadline };
    if (file) updateFields.file = file;

    const assignment = await Assignment.findByIdAndUpdate(assignmentId, updateFields, { new: true });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    console.error("Update assignment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE /api/assignments/:assignmentId → Delete assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await Submission.deleteMany({ assignment: assignmentId }); // Also delete submissions
    await assignment.deleteOne();

    res.json({ message: "Assignment and related submissions deleted" });
  } catch (error) {
    console.error("Delete assignment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET /api/assignments/:courseId/assignments → Get all assignments for course
exports.getAssignmentsForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await Assignment.find({ course: courseId }).sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error) {
    console.error("Fetch assignments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET /api/assignments/:assignmentId/submissions → Get all submissions for an assignment
exports.getSubmissionsForAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await Submission.find({ assignment: assignmentId }).populate("consumer", "name email");

    res.json(submissions);
  } catch (error) {
    console.error("Fetch submissions error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
