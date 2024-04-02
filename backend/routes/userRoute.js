import express from "express";

import {
  getUser,
  getSellerDashboard,
  rateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", getUser);
router.get("/dashboard", getSellerDashboard);
router.post("/rate/:id", rateUser);

export default router;
