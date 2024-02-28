import express from "express";
import {
  getAllProducts,
  addProduct,
  getProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/shop", getAllProducts);
router.get("/shop/:id", getProduct);
router.post("/shop/add", addProduct);

export default router;
