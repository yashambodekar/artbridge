const CourseContent = require("../models/CourseContent");
const Course = require("../models/Course");
const fs = require("fs");
const path = require("path");

// Upload course content
exports.uploadCourseContent = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, description } = req.body;
    const files = req.files?.map((file) => file.path);

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the user is the artisan of the course
    if (course.artisan.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Create course content
    const courseContent = new CourseContent({
      course: courseId,
      name,
      description,
      files,
      uploadedBy: req.user._id,
    });

    await courseContent.save();
    res.status(201).json(courseContent);
  } catch (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File size exceeds the limit of 10MB" });
    }
    console.error("Upload course content error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get course content
exports.getAllContentsForCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const contents = await CourseContent.find({ course: courseId })
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(contents);
  } catch (error) {
    console.error("Error fetching course content:", error);
    res.status(500).json({ message: "Error fetching course content", error: error.message });
  }
};

// Update course content
exports.updateCourseContent = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { name, description } = req.body;
    const newFiles = req.files?.map((file) => file.path);

    const courseContent = await CourseContent.findById(contentId);
    if (!courseContent) {
      return res.status(404).json({ message: "Course content not found" });
    }

    // Check if the user is the uploader
    if (courseContent.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update fields
    courseContent.name = name || courseContent.name;
    courseContent.description = description || courseContent.description;
    courseContent.files = newFiles || courseContent.files;
    courseContent.lastUpdated = Date.now();

    await courseContent.save();
    res.json(courseContent);
  } catch (error) {
    console.error("Update course content error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete course content
exports.deleteCourseContent = async (req, res) => {
  try {
    const { contentId } = req.params;

    const courseContent = await CourseContent.findById(contentId);
    if (!courseContent) {
      return res.status(404).json({ message: "Course content not found" });
    }

    // Check if the user is the uploader
    if (courseContent.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete files from the filesystem
    courseContent.files.forEach((filePath) => {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    });

    await courseContent.deleteOne();
    res.json({ message: "Course content deleted successfully" });
  } catch (error) {
    console.error("Delete course content error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

