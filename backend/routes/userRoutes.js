const express = require("express");
const router = express.Router();
const  { protect } = require("../middleware/authMiddleware");
const {
  getMe,
  updateProfile,
  // getPurchasedCourses,
  // getSoldCoursesWithConsumers
} = require("../controllers/userController");

router.get("/me", protect, getMe);
router.put("/update", protect, updateProfile);
// k,

module.exports = router;
