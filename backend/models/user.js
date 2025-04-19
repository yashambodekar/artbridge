const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    role: { type: String, enum: ["Artisan", "Consumer"], required: true },
    name: String,
    email: { type: String, unique: true, required: true },
    contact: String,
    address: String,
    password: String,
    profilePicture: String,
    soldProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    soldCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

