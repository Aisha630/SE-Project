import express from "express";
import uploadImage from "../middleware/imageMiddleware.js";

import {
  getAllProducts,
  addProduct,
  getProduct,
  deleteProduct,
  filterProducts,
  fetchLatest,
  bidOnProduct,
  reopenAuction,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/shop", getAllProducts);
router.get("/shop/:id", getProduct);
router.delete("/shop/:id", deleteProduct);

router.post("/sell", uploadImage, addProduct);
router.get("/filter", filterProducts);
router.get("/latest", fetchLatest);

router.post("/shop/:id/bid", bidOnProduct);
router.post("/shop/:id/reopen", reopenAuction);

export default router;
