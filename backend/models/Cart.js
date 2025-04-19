// models/Cart.js
const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  consumer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
