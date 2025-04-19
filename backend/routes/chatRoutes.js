const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getChatUsers,
  getMessages,
  sendMessage,
} = require("../controllers/chatController");

// Sidebar: Get users for course
router.get("/course/:courseId/users", protect, getChatUsers);

// Chat: Get message history with one user
router.get("/messages/:courseId/:userId", protect, getMessages);

// Send a message (optional fallback to REST)
router.post("/message", protect, sendMessage);

module.exports = router;
