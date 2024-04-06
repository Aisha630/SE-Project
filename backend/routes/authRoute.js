import express from "express";
import multer from "multer";

import {
  signin,
  signup,
  verifyEmail,
  resendVerification,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", multer().none(), signup);
router.post("/login", multer().none(), signin);

router.get("/verify", verifyEmail);
router.post("/resend_code", resendVerification);
router.post("/forget_password", requestPasswordReset);
router.post("/reset_password", resetPassword);

export default router;
