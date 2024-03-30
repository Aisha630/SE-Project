import Image from "../models/imageModel.js";
import path from "path";
import { Product } from "../models/productBase.js";
import {
  SaleProduct,
  DonationProduct,
  AuctionProduct,
} from "../models/productModels.js";

const productModels = {
  sale: SaleProduct,
  donate: DonationProduct,
  auction: AuctionProduct,
};

// FRONTEND: now requires productType in query
export async function getAllProducts(req, res) {
  let productModel = Product;

  const { productType } = req.query;
  if (productType) {
    productModel = productModels[productType];
  }

  if (!productModel) {
    return res.status(400).json({ error: "Invalid mode of sale" });
  }

  const products = await productModel.find({ isHold: false });
  res.json(products);
}

export async function getProduct(req, res) {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id, isHold: false });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
}

// FRONTEND: now requires productType in req.body
export async function addProduct(req, res) {
  let { productType, tags, ...productData } = req.body;
  productData.tags = tags ? (Array.isArray(tags) ? tags : [tags]) : [];

  productData.seller = req.user.username;

  const productModel = productModels[productType];

  if (!productModel) {
    return res.status(400).json({ error: "Invalid mode of sale" });
  }

  const { value, error } = await productModel.validate(productData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No images uploaded" });
  }

  const images = await Promise.all(
    req.files.map(async (file) => {
      const image = new Image({
        filename: Date.now() + path.extname(file.originalname),
        data: file.buffer,
        mimeType: file.mimeType,
      });
      await image.save();
      return `/images/${image.filename}`;
    })
  );
  value.images = images;

  const product = new productModel(value);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteProduct(req, res) {
  const productId = req.params.id;
  const seller = req.user.username;

  try {
    const product = await Product.findOne({ _id: productId, seller });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    await Product.deleteOne({ _id: productId });

    if (product.images && product.images.length > 0) {
      const imageFilenames = product.images.map((imagePath) => {
        return imagePath.split("/").pop();
      });

      for (const filename of imageFilenames) {
        await Image.deleteMany({ filename: filename });
      }
    }
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// FRONTEND: now required productType in req.query
export async function filterProducts(req, res) {
  const { category, tags, sizes, colors, productType } = req.query;
  const query = { isHold: false };

  const productModel = productModels[productType];
  if (!productModel) {
    return res.status(400).json({ error: "Invalid mode of sale" });
  }

  if (category) {
    query.category = category;
  }

  if (tags) {
    query.tags = { $in: Array.isArray(tags) ? tags : tags.split(",") };
  }

  if (sizes && sizes.length > 0 && category === "Clothing") {
    query.size = { $in: Array.isArray(sizes) ? sizes : [sizes] };
  }

  if (colors && colors.length > 0 && category === "Clothing") {
    query.color = { $in: Array.isArray(colors) ? colors : [colors] };
  }

  const products = await productModel.find(query);
  res.json(products);
}

export async function fetchLatest(req, res) {
  const { limit } = req.query;

  try {
    const products = await SaleProduct.find({})
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
}
