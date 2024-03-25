import express from "express";
import multer from "multer";
import path from "path";

import {
  getAllProducts,
  addProduct,
  getProduct,
  deleteProduct,
  filterProducts,
  fetchLatest,
} from "../controllers/productController.js";

const router = express.Router();

const upload = multer({
  limits: { fileSize: 2000000 },
  fileFilter: (_, file, cb) => {
    const filetypes = /jpeg|jpg|png/;

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
}).array("images", 5);

router.get("/shop", getAllProducts);
router.get("/shop/:id", getProduct);
router.delete("/shop/:id", deleteProduct);

router.post("/sell", upload, addProduct);
router.post("/filter", filterProducts);
router.get("/latest", fetchLatest);

export default router;
