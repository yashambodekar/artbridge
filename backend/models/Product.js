const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    artisan: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    image: String,
    price: Number,
    description: String,
    soldTo: [
        {
          consumer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          name: String,
          email: String,
          contact: String,
          address: String,
          quantity: Number,
          totalPrice: Number,
        },
    ],
});

module.exports = mongoose.model("Product", ProductSchema);
