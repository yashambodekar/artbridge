// controllers/cartController.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const consumerId = req.user.id;

    let cart = await Cart.findOne({ consumer: consumerId });

    if (!cart) {
      cart = new Cart({ consumer: consumerId, products: [] });
    }

    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get cart for a user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ consumer: req.user.id }).populate("products.product");
    res.json(cart || { products: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const consumerId = req.user.id;

    const cart = await Cart.findOne({ consumer: consumerId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Remove Cart Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};
