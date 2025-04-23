// controllers/userController.js
const User = require("../models/user");

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

// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().populate("artisan", "name");
//     res.json(products);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
module.exports = {
  getMe,
  updateProfile,
  // getAllProducts,
  

};

