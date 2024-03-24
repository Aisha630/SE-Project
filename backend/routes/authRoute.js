import express from "express";
import multer from "multer";

import {
  signin,
  signup,
  verifyEmail,
  resendVerification,
} from "../controllers/authController.js";

const router = express.Router();

// user Authentication routes user signup, login, email verification and resending verification
router.post("/register", multer().none(), signup);
router.post("/login", multer().none(), signin);

router.get("/verify", verifyEmail);
router.post("/resend_code", resendVerification);

export default router;
