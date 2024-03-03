import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import authorizeUser from "./middleware/authMiddleware.js";

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Serve static files from uploads directory
app.use("/uploads", express.static("../uploads"));

// Route handling
app.use(authRoutes);
app.use(authorizeUser);
app.use(productRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
