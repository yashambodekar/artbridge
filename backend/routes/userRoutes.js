const express = require("express");
const router = express.Router();
const  { protect } = require("../middleware/authMiddleware");
const {
  getMe,
  updateProfile,
  getAllArtisans,
} = require("../controllers/userController");

router.get("/me", protect, getMe);
router.put("/update", protect, updateProfile);
router.get("/artisans", getAllArtisans);
// k,

module.exports = router;
