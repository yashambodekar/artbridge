const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    artisan: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    image: String,
    price: Number,
    description: String
});

module.exports = mongoose.model("Product", ProductSchema);
