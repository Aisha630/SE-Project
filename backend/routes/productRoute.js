import express from "express";
import uploadImage from "../middleware/imageMiddleware.js";

import {
  getAllProducts,
  addProduct,
  getProduct,
  deleteProduct,
  filterProducts,
  fetchLatest,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/shop", getAllProducts);
router.get("/shop/:id", getProduct);
router.delete("/shop/:id", deleteProduct);

router.post("/sell", uploadImage, addProduct);
router.get("/filter", filterProducts);
router.get("/latest", fetchLatest);

export default router;
