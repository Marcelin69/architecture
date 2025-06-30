const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsWithPagination,
} = require("../controllers/product.controller");

router.post("/add-product", createProduct);
router.patch("/edit-product", updateProduct);
router.get("/get-all-products", getAllProducts);
router.get("/get-product-by-id", getProductById);
router.delete("/delee-product", deleteProduct);
router.get("/get-products-with-pagination", getProductsWithPagination);
module.exports = router;
