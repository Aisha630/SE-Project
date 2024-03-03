import express from "express";
import upload from "../middleware/multerConfig.js";
import {
  getAllProducts,
  addProduct,
  getProduct,
  deleteProduct,
  filterProducts,
} from "../controllers/productController.js";

const router = express.Router();

// Route to get all products.
router.get("/shop", getAllProducts);
// Route to retrive a single product by ID.
router.get("/shop/:id", getProduct);
// Route to delete a single product by ID.
router.delete("/shop/:id", deleteProduct);
// Route for adding a new product.
router.post("/sell", upload, addProduct);

// Route to filter products based on query parameters.
router.get("/filter", filterProducts);

export default router;
