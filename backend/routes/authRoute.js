import express from "express";
import { signin, signup, verifyEmail, resendVerification } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", signup);
router.get("/verify", verifyEmail);
router.post("/login", signin);
router.post("/resend_code", resendVerification)

export default router;
