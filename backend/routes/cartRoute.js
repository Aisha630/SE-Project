import express from "express";

import {
  getCart,
  addToCart,
  deleteFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/cart", getCart);
router.post("/cart", addToCart);
router.delete("/cart", deleteFromCart);

export default router;
