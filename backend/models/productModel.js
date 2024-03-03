import Joi from "joi";
import config from "../config.js";
import joigoose from "joigoose";
import mongoose from "mongoose";

function isValidCategory(category, helpers) {
  const validCategories = Object.keys(config.categories);

  if (!validCategories.includes(category)) {
    return helpers.error("any.invalid");
  }

  return category;
}

function isValidTags(tags, helpers) {
  const validTags = config.categories[helpers.state.ancestors[0].category];

  for (const tag of tags) {
    if (!validTags.includes(tag)) {
      return helpers.error("any.invalid");
    }
  }

  return tags;
}

const joiSchema = Joi.object({
  name: Joi.string().max(64).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().max(100),

  category: Joi.string().custom(isValidCategory).required(),
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

  condition: Joi.string().valid('new', 'old').required(),
  images: Joi.array().items(Joi.string().required()).min(1).max(5).required(),

  seller: Joi.string().required(),
  isHold: Joi.boolean().default(false)
});

const productSchema = new mongoose.Schema(
  joigoose(mongoose).convert(joiSchema)
);
productSchema.set("validateBeforeSave", false);
productSchema.statics.validate = (product) => joiSchema.validate(product);

export default mongoose.model("Product", productSchema);
