import "dotenv/config";
import authRoutes from "./routes/authRoute.js";
import authorizeUser from "./middleware/authMiddleware.js";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoute.js";

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
