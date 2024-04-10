import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import Image from "./models/imageModel.js";
import User from "./models/userModel.js";
import Notification from "./models/notifModel.js";
import authRoutes from "./routes/authRoute.js";
import authorizeUser from "./middleware/authMiddleware.js";
import cartRoutes from "./routes/cartRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import notifRoutes from "./routes/notifRoute.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware setup
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Move this elsewhere
app.get("/images/:filename", async (req, res) => {
  const image = await Image.findOne({ filename: req.params.filename });
  if (!image) {
    return res.sendStatus(404);
  }

  res.set("Content-Type", image.mimeType);
  res.send(image.data);
});

io.on("connection", (socket) => {
  socket.on("register", (token) => {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (err, decoded) => {
      if (err) {
        console.log("Wrong jwt");
        return socket.disconnect();
      }

      try {
        const user = await User.findOne({ username: decoded.username });
        if (!user) {
          console.log("User not found");
          return socket.disconnect();
        }
        user.connectionID = socket.id;
        await user.save();
      } catch (error) {
        console.error("Error fetching user:", error);
        return socket.disconnect();
      }
    });
  });

  socket.on("read", async (notificationId) => {
    try {
      const notif = await Notification.findOne({ _id: notificationId });
      notif.status = "read";
      await notif.save();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  });
});

app.use(authRoutes);
app.use(authorizeUser);
app.use(productRoutes);
app.use(cartRoutes);
app.use(userRoutes);
app.use(notifRoutes);

if (!["PROD", "DEV"].includes(process.env.BUILD_MODE)) {
  console.error(`Invalid build mode ${process.env.BUILD_MODE}`);
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT;

    server.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.BUILD_MODE} mode, on port ${PORT}.`
      );
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
export default io;

export default io; 