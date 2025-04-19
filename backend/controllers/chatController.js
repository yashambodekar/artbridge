const Message = require("../models/Message");
const Course = require("../models/Course");
const User = require("../models/user");

// @desc Get users enrolled in a course (for chat sidebar)
// @route GET /api/chat/course/:courseId/users
exports.getChatUsers = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const artisan = await User.findById(course.artisan);
    const consumers = await User.find({ purchasedCourses: course._id });

    res.json({
      artisan: { _id: artisan._id, name: artisan.name },
      consumers: consumers.map((c) => ({ _id: c._id, name: c.name })),
    });
  } catch (err) {
    console.error("Chat Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get message history between 2 users in a course
// @route GET /api/chat/messages/:courseId/:userId
exports.getMessages = async (req, res) => {
  try {
    const { courseId, userId } = req.params;

    const messages = await Message.find({
      course: courseId,
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error("Fetch Messages Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Send a message (used for Socket.io fallback)
// @route POST /api/chat/message
exports.sendMessage = async (req, res) => {
  try {
    const { courseId, receiverId, message } = req.body;

    const newMessage = await Message.create({
      course: courseId,
      sender: req.user.id,
      receiver: receiverId,
      message,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};