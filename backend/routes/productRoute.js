import express from "express";
import uploadImage from "../middleware/imageMiddleware.js";

import {
  getAllProducts,
  addProduct,
  getProduct,
  deleteProduct,
  filterProducts,
  fetchLatest,
  reopen,
} from "../controllers/productController.js";

import {
  createDonationRequest,
  closeDonation,
} from "../controllers/donateController.js";

import { bidOnProduct } from "../controllers/auctionController.js";

const router = express.Router();

router.get("/shop", getAllProducts);
router.get("/shop/:id", getProduct);
router.delete("/shop/:id", deleteProduct);

router.post("/sell", uploadImage, addProduct);
router.get("/filter", filterProducts);
router.get("/latest", fetchLatest);
router.patch("/shop/:id/reopen", reopen);

router.post("/shop/:id/bid", bidOnProduct);
router.post("/shop/:id/request", createDonationRequest);
router.post("/shop/:id/close", closeDonation);

export default router;
