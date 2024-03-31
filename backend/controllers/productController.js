import Joi from "joi";
import path from "path";
import schedule from "node-schedule";

import Image from "../models/imageModel.js";
import config from "../config.js";
import { isValidTags, Product } from "../models/productBase.js";
import { closeAuction } from "./auctionController.js";

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

export async function getAllProducts(req, res) {
  let productModel = Product;

  const { productType, q } = req.query;
  if (productType) {
    productModel = productModels[productType];
  }

  if (!productModel) {
    return res.status(400).json({ error: "Invalid mode of sale" });
  }

  const regex = new RegExp(q ? q : ".*", "i");
  const products = await productModel.find({ name: regex, isHold: false });
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

export async function updateProduct(req, res) {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id, seller: req.user.username });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { value, error } = Joi.object({
    name: Joi.string().max(100),
    description: Joi.string().max(300),
    brand: Joi.string().max(100),

    category: Joi.string().valid(...Object.keys(config.categories)),
    tags: Joi.array().items(Joi.string()).custom(isValidTags),

    size: Joi.when("category", {
      is: "Clothing",
      then: Joi.string().valid(...config.sizes),
      otherwise: Joi.forbidden(),
    }),
    color: Joi.when("category", {
      is: "Clothing",
      then: Joi.string().valid(...config.colors),
      otherwise: Joi.forbidden(),
    }),

    condition: Joi.string().valid("new", "old"),
  }).validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newProduct = await Product.findOneAndUpdate(
    { _id: id },
    { $set: value },
    { new: true }
  );

  res.status(200).json(newProduct);
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
    await product.save();

    if (product.__t == "AuctionProduct") {
      schedule.scheduleJob(new Date(product.endtime), async () => {
        await closeAuction(product._id);
      });
    }

    res.status(201).json(product);
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
    console.log(err.message);
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
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

export async function reopen(req, res) {
  const { id } = req.params;

  const product = await Product.findOne({
    _id: id,
    isHold: true,
    seller: req.user.username,
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const productType = product.__t;
  switch (productType) {
    case "SaleProduct":
      await reopenSale(req, product);
    case "AuctionProduct":
      await reopenAuction(req, product);
    case "DonationProduct":
      await reopenDonation(product);
  }
  res.status(201).json(product);
}

async function reopenAuction(req, product) {
  const { value, error } = Joi.object({
    startingBid: Joi.number().min(0).required(),
    endTime: Joi.date().required(),
  }).validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  product.startingBid = value.startingBid;
  product.endTime = value.endtime;
  product.currentBid = value.startingBid;
  product.isHold = false;
  delete product.buyerUsername;

  schedule.scheduleJob(new Date(product.endtime), async () => {
    await closeAuction(product._id);
  });

  await product.save();
}

async function reopenSale(req, product) {
  const { value, error } = Joi.object({
    price: Joi.number().min(0).required(),
  }).validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  product.price = value.startingBid;
  product.isHold = false;
  await product.save();
}

async function reopenDonation(product) {
  product.requestList = [];
  product.isHold = false;
  delete product.buyerUsername;
  await product.save();
}
