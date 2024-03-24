import Joi from "joi";
import joigoose from "joigoose";
import mongoose from "mongoose";

import config from "../config.js";

// Checks if valid category from config exists
function isValidCategory(category, helpers) {
  const validCategories = Object.keys(config.categories);

  if (!validCategories.includes(category)) {
    return helpers.error("any.invalid");
  }

  return category;
}

// Checks if each tag of given category against valid tags in config
function isValidTags(tags, helpers) {
  const validTags = config.categories[helpers.state.ancestors[0].category];

  for (const tag of tags) {
    if (!validTags.includes(tag)) {
      return helpers.error("any.invalid");
    }
  }

  return tags;
}

// Define joi schema for product validation
const joiSchema = Joi.object({
  name: Joi.string().max(64).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().max(100),
  brand: Joi.string().max(64).required(),

  category: Joi.string().custom(isValidCategory).required(),
  tags: Joi.array().items(Joi.string()).custom(isValidTags).default([]),

  // Only allow size and color attribute for 'clothing' category
  size: Joi.when("category", {
    is: "Clothing",
    then: Joi.string()
      .valid(...config.sizes)
      .required(),
    otherwise: Joi.forbidden(),
  }),
  color: Joi.when("category", {
    is: "Clothing",
    then: Joi.string()
      .valid(...config.colors)
      .required(),
    otherwise: Joi.forbidden(),
  }),

  condition: Joi.string().valid("new", "old").required(),
  images: Joi.array().items(Joi.string().required()).min(1).max(5),

  // Seller's unique username
  seller: Joi.string().required(),
  // Set True when customer checkout with product, can be reset by seller
  isHold: Joi.boolean().default(false),
});

// Convert Joi schema to Mongoose schema and validate
const productSchema = new mongoose.Schema(
  joigoose(mongoose).convert(joiSchema), { timestamps: true }
);
productSchema.set("validateBeforeSave", false);
productSchema.statics.validate = (product) => joiSchema.validate(product);

export default mongoose.model("Product", productSchema);
