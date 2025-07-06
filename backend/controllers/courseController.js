const Course = require("../models/Course");
const User = require("../models/user");


// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const { name, price, description, mode } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !description || !price || !mode || !image) {
      return res.status(400).json({ message: "Please provide all fields." });
    }

    const course = new Course({
      artisan: req.user.id,
      name,
      image,
      price,
      description,
      mode,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error("Course Add Error", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.artisan.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this course" });
    }

    await Course.deleteOne({ _id: courseId });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete Course Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get courses of logged-in artisan
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ artisan: req.user.id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("artisan", "name");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Buy course
exports.buyCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate("artisan");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const consumer = await User.findById(req.user._id);
    const artisan = await User.findById(course.artisan._id);

    if (consumer.purchasedCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already purchased this course" });
    }

    consumer.purchasedCourses.push(courseId);
    await consumer.save();

    artisan.soldCourses.push(courseId);
    await artisan.save();

    res.json({ message: "Course purchased successfully" });
  } catch (err) {
    console.error("Buy error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    console.log("Triggered getCourseById with ID:", req.params.id); // Debugging log
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error("Error in getCourseById:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all courses purchased by the consumer
exports.getPurchasedCourses = async (req, res) => {
  try {
    const consumer = await User.findById(req.user.id).populate({
      path: "purchasedCourses",
      select: "name price description image mode artisan",
      populate: { path: "artisan", select: "name email" },
    });

    if (!consumer) {
      return res.status(404).json({ message: "Consumer not found" });
    }

    res.json(consumer.purchasedCourses);
  } catch (error) {
    console.error("Get Purchased Courses Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
