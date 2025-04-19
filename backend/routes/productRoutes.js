const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  addProduct,
  deleteProduct,
  getMyProducts,
  getAllProducts,
  buyProduct,
  getProductConsumers,
  getProductPrice,
} = require("../controllers/productController");

router.post("/add", protect, upload.single("image"), addProduct);
router.delete("/delete/:id", protect, deleteProduct);
router.get("/my-products", protect, getMyProducts);
router.get("/AllProducts", getAllProducts);
router.post("/buy", protect, buyProduct);
router.get("/:productId/consumers", protect, getProductConsumers);
router.get("/:productId/price", getProductPrice);

module.exports = router;
