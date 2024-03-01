import Joi from "joi";
import config from "../config.js"
import joigoose from "joigoose";
import mongoose from "mongoose";

function isValidCategory(category, helpers) {
  const validCategories = Object.keys(config.categories);

  if (!validCategories.includes(category)) {
    return helpers.error('any.invalid');
  }

  return category;
}

function isValidTags(tags, helpers) {
  const validTags = config.categories[helpers.state.ancestors[0].category];

  for (const tag of tags) {
    if (!validTags.includes(tag)) {
      return helpers.error('any.invalid');
    }
  }

  return tags;
}

const joiSchema = Joi.object({
  name: Joi.string().max(64).required(),
  category: Joi.string().custom(isValidCategory).required(),
  tags: Joi.array().items(Joi.string()).custom(isValidTags).default([]),
  price: Joi.number().min(0).required(),
  seller: Joi.string().required(),
  isHold: Joi.boolean().default(false)
});

const productSchema = new mongoose.Schema(joigoose(mongoose).convert(joiSchema));
productSchema.statics.validate = (product) => joiSchema.validate(product);

export default mongoose.model('Product', productSchema);