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

// // GET /my-courses - Get purchased courses (Consumers)
// const getPurchasedCourses = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .populate("purchasedCourses", "name price image mode description");

//     if (!user || user.role !== "Consumer") {
//       return res.status(403).json({ message: "Unauthorized: Only consumers can access this route" });
//     }

//     res.json(user.purchasedCourses);
//   } catch (error) {
//     console.error("Error fetching purchased courses:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // GET /my-courses-with-consumers - For Artisans
// const getSoldCoursesWithConsumers = async (req, res) => {
//   try {
//     const artisan = await User.findById(req.user.id).populate("soldCourses");

//     if (!artisan || artisan.role !== "Artisan") {
//       return res.status(403).json({ message: "Unauthorized: Only artisans can access this route" });
//     }

//     const uniqueCoursesMap = new Map();
//     artisan.soldCourses.forEach((course) => {
//       if (!uniqueCoursesMap.has(course._id.toString())) {
//         uniqueCoursesMap.set(course._id.toString(), course);
//       }
//     });

//     const uniqueCourses = Array.from(uniqueCoursesMap.values());

//     const result = await Promise.all(
//       uniqueCourses.map(async (course) => {
//         const count = await User.countDocuments({ purchasedCourses: course._id });
//         return {
//           _id: course._id,
//           name: course.name,
//           price: course.price,
//           mode: course.mode,
//           image: course.image,
//           consumersCount: count,
//           earnings: count * course.price,
//         };
//       })
//     );

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

module.exports = {
  getMe,
  updateProfile,
  // getPurchasedCourses,
  // getSoldCoursesWithConsumers,
};
