import express from "express";
import deleteNotification from "../controllers/notifController";

const router = express.Router();
router.delete("/notif/:id", deleteNotification);

export default router;
