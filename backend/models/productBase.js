import Joi from "joi";
import joigoose from "joigoose";
import mongoose from "mongoose";

import config from "../config.js";

export function isValidTags(tags, helpers) {
  const validTags = config.categories[helpers.state.ancestors[0].category];

  for (const tag of tags) {
    if (!validTags.includes(tag)) {
      return helpers.error("any.invalid");
    }
  }

  return tags;
}

export const productBaseJoi = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(300),
  brand: Joi.string().max(100).required(),

  category: Joi.string()
    .valid(...Object.keys(config.categories))
    .required(),
  tags: Joi.array().items(Joi.string()).custom(isValidTags).default([]),

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
  isHold: Joi.boolean().default(false),
  seller: Joi.string().required(),
});

const productBaseSchema = new mongoose.Schema(
  joigoose(mongoose).convert(productBaseJoi),
  { timestamps: true }
);
productBaseSchema.set("validateBeforeSave", false);
productBaseSchema.statics.validate = (product) =>
  productBaseJoi.validate(product);

export const Product = mongoose.model("Product", productBaseSchema);
