// routes/productRoutes.js
const express = require("express");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Add Product
router.post("/add", protect, async (req, res) => {
    const { name, image, price, description } = req.body;
    try {
        const product = new Product({ artisan: req.user.id, name, image, price, description });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
});

// Get Artisan's Products
router.get("/my-products", protect, async (req, res) => {
    try {
        const products = await Product.find({ artisan: req.user.id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;