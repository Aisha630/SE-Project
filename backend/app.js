import "dotenv/config";
import authorize from "./auth.js";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(authRoutes);
app.use(authorize);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
