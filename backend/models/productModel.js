import Joi from "joi";
import joigoose from "joigoose";
import mongoose from "mongoose";

const joiSchema = Joi.object({
  name: Joi.string().max(50).required(),
  price: Joi.number().min(0).required(),
  seller: Joi.string().required(),
  isHold: Joi.boolean().required()
});

const productSchema = new mongoose.Schema(joigoose(mongoose).convert(joiSchema));
productSchema.statics.validate = (product) => joiSchema.validate(product);

export default mongoose.model('Product', productSchema);