// controllers/userController.js
const User = require("../models/user");
const Product = require("../models/Product");
const Course = require("../models/Course");

// GET /me - Fetch user profile
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("soldProducts", "name price")
      .populate("soldCourses", "name price");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /update - Update profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, contact, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, contact, address },
      { new: true }
    ).populate("soldProducts").populate("soldCourses");

    res.json(updatedUser);
  } catch (error) {
    console.error("Profile update failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllArtisans = async (req, res) => {
  try {
    const artisans = await User.find({ role: "Artisan" }).select("name profilePicture");

    const artisanData = await Promise.all(
      artisans.map(async (artisan) => {
        const productCount = await Product.countDocuments({ artisan: artisan._id });
        const courseCount = await Course.countDocuments({ artisan: artisan._id });

        return {
          id: artisan._id,
          name: artisan.name,
          profilePicture: artisan.profilePicture,
          productCount,
          courseCount,
        };
      })
    );

    res.status(200).json(artisanData);
  } catch (error) {
    console.error("Error fetching artisans:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMe,
  updateProfile,
  getAllArtisans,
};

