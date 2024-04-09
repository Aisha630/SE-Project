import Joi from "joi";
import joigoose from "joigoose";
import mongoose from "mongoose";

const joiSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  verified: Joi.boolean().default(false),
  avatar: Joi.string().required(),
  connectionID: Joi.string().optional(),
  donationHistory: Joi.array().items(Joi.string()).default([]),

  rating: Joi.object({
    rating: Joi.number().min(0).max(5).default(0),
    numOfRatings: Joi.number().default(0),
  }),
  ratedBy: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .default([]),

  salesHistory: Joi.array()
    .items(
      Joi.object({
        saleDate: Joi.date().required(),
        price: Joi.number().required(),
      })
    )
    .default([]),
});

const userSchema = new mongoose.Schema(joigoose(mongoose).convert(joiSchema));
userSchema.set("validateBeforeSave", false);
userSchema.statics.validate = (user) => joiSchema.validate(user);

export default mongoose.model("User", userSchema);
