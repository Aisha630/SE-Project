import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import Image from "./models/imageModel.js";
import authRoutes from "./routes/authRoute.js";
import authorizeUser from "./middleware/authMiddleware.js";
import cartRoutes from "./routes/cartRoute.js";
import productRoutes from "./routes/productRoute.js";

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());

// TODO: Move this elsewhere
app.get("/images/:filename", async (req, res) => {
  const image = await Image.findOne({ filename: req.params.filename });
  if (!image) {
    return res.sendStatus(404);
  }

  res.set("Content-Type", image.mimeType);
  res.send(image.data);
});

// Route handling
app.use(authRoutes);
app.use(authorizeUser);
app.use(productRoutes);
app.use(cartRoutes);

if (!["PROD", "DEV"].includes(process.env.BUILD_MODE)) {
  console.error(`Invalid build mode ${process.env.BUILD_MODE}`);
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.BUILD_MODE} mode, on port ${PORT}.`
      );
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
