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


// GET /api/artisan/stats - Fetch artisan statistics
const getArtisanStats = async (req, res) => {
  try {
    const artisanId = req.user.id; // Assuming the artisan is authenticated

    // Count the number of products and courses created by the artisan
    const productsCreated = await Product.countDocuments({ artisan: artisanId });
    const coursesCreated = await Course.countDocuments({ artisan: artisanId });

    // Calculate the number of products sold
    const productsSold = await Product.aggregate([
      { $match: { artisan: artisanId } }, // Match products created by the artisan
      { $unwind: "$soldTo" }, // Unwind the soldTo array
      { $group: { _id: null, totalSold: { $sum: "$soldTo.quantity" } } }, // Sum up the quantities
    ]);

    // Calculate the number of courses sold
    const coursesSold = await Course.aggregate([
      { $match: { artisan: artisanId } }, // Match courses created by the artisan
      {
        $lookup: {
          from: "users", // Reference the User collection
          localField: "_id",
          foreignField: "purchasedCourses",
          as: "buyers",
        },
      },
      { $project: { totalSold: { $size: "$buyers" } } }, // Count the number of buyers
      { $group: { _id: null, totalSold: { $sum: "$totalSold" } } }, // Sum up the counts
    ]);

    res.status(200).json({
      productsCreated,
      coursesCreated,
      productsSold: productsSold[0]?.totalSold || 0, // Default to 0 if no sales
      coursesSold: coursesSold[0]?.totalSold || 0, // Default to 0 if no sales
    });
  } catch (error) {
    console.error("Error fetching artisan stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMe,
  updateProfile,
  getAllArtisans,
  getArtisanStats,
};

