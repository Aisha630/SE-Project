import express from "express";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notifController.js";

const router = express.Router();
router.get("/notif", getNotifications);
router.delete("/notif/:id", deleteNotification);

export default router;
