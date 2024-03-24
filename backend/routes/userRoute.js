import express from "express";

import {
    getUser,
    getSellerDashboard,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", getUser);
router.get("/dashboard", getSellerDashboard);

export default router;