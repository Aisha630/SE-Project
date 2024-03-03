import express from "express";
import {
  getAllProducts,
  addProduct,
  getProduct,
  deleteProduct,
  filterProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/shop", getAllProducts);
router.get("/shop/:id", getProduct);
router.delete("/shop/:id", deleteProduct);
router.post("/sell", addProduct);

router.get("/filter", filterProducts);

export default router;
