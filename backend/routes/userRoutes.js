const express = require("express");
const router = express.Router();
const  { protect } = require("../middleware/authMiddleware");
const {
  getMe,
  updateProfile,
  getAllArtisans,
  getArtisanStats
} = require("../controllers/userController");

router.get("/me", protect, getMe);
router.put("/update", protect, updateProfile);
router.get("/artisans", getAllArtisans);
router.get("/artisan/stats", protect, getArtisanStats);

// k,

module.exports = router;
