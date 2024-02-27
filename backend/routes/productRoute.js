import express from "express";
import {
  getAllProducts,
  addProduct,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/shop", getAllProducts);
router.get("/shop/:id", getProductById);
router.post("/shop/add", addProduct);

export default router;
