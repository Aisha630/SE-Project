import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path"
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import authorizeUser from "./middleware/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(authRoutes);
app.use(authorizeUser);
app.use(productRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
