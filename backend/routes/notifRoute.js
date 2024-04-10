import express from "express";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notifController";

const router = express.Router();
router.get("/notif/:id", getNotifications);
router.delete("/notif/:id", deleteNotification);

export default router;
