import express from "express";
import {
  getAllProducts,
  addProduct,
  getProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/shop", getAllProducts);
router.get("/shop/:id", getProduct);
router.delete("/shop/:id", deleteProduct);
router.post("/shop", addProduct);

export default router;
