const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    artisan: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    image: String,
    price: Number,
    description: String,
    mode: { type: String, enum: ["online", "offline"], required: true }
});

module.exports = mongoose.model("Course", CourseSchema);
