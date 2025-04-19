const Product = require("../models/Product");
const User = require("../models/user");

// Add product
const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: "Please provide all fields." });
    }

    const product = new Product({
      artisan: req.user.id,
      name,
      image,
      price,
      description,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.artisan.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this product" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get artisan's products
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ artisan: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("artisan", "name");
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Buy product
const buyProduct = async (req, res) => {
  try {
    const { productId, name, email, contact, address, quantity, totalPrice } = req.body;
    const consumerId = req.user.id;

    // Find the product
    const product = await Product.findById(productId).populate("artisan", "name email contact");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add the consumer's details to the soldTo field
    product.soldTo.push({ consumer: consumerId, name, email, contact, address, quantity, totalPrice });
    await product.save();

    res.status(200).json({
      message: "Product purchased successfully",
      artisan: {
        name: product.artisan.name,
        email: product.artisan.email,
        contact: product.artisan.contact,
      },
    });
  } catch (error) {
    console.error("Error in buyProduct:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProductConsumers = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product and populate the soldTo field
    const product = await Product.findById(productId).populate("soldTo.consumer", "name email contact");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the soldTo array with all relevant fields
    const consumers = product.soldTo.map((entry) => ({
      consumerId: entry.consumer?._id, // Ensure consumer ID is included
      name: entry.name,
      email: entry.email,
      contact: entry.contact,
      address: entry.address,
      quantity: entry.quantity,
      totalPrice: entry.totalPrice,
    }));

    res.status(200).json(consumers);
  } catch (error) {
    console.error("Error fetching product consumers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProductPrice = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the price of the product
    res.status(200).json({ price: product.price });
  } catch (error) {
    console.error("Error fetching product price:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Export all functions
module.exports = {
  addProduct,
  deleteProduct,
  getMyProducts,
  getAllProducts,
  buyProduct, // Ensure this is exported
  getProductConsumers,
  getProductPrice,
};