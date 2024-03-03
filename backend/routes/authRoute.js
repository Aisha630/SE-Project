import express from "express";
import {
  signin,
  signup,
  verifyEmail,
  resendVerification,
} from "../controllers/authController.js";

const router = express.Router();

// user Authentication routes user signup, login, email verification and resending verification
router.post("/register", signup);
router.get("/verify", verifyEmail);
router.post("/login", signin);
router.post("/resend_code", resendVerification);

export default router;
