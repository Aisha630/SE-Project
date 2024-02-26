import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";
import productRouter from "./routes/productRoute.js";
import authorizeUser from "./middleware/authMiddleware.js";
import bodyParser from "body-parser"

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(authorizeUser);
app.use(productRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));


// TODO:
// 1. Run and debug
// 2. Image upload
// 3. sub categories