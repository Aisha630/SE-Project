import Joi from "joi";
import joigoose from "joigoose";
import mongoose from "mongoose";

const joiSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  verified: Joi.boolean().default(false),
  avatar: Joi.string().required(),
  donationHistory: Joi.array().items(Joi.string()).default([]),
  rating: Joi.object({
    rating: Joi.number().min(0).max(5).default(0),
    numOfRatings: Joi.number().default(0),
  }),
});

const userSchema = new mongoose.Schema(joigoose(mongoose).convert(joiSchema));
userSchema.set("validateBeforeSave", false);
userSchema.statics.validate = (user) => joiSchema.validate(user);

export default mongoose.model("User", userSchema);
