import Joi from "joi";
import joigoose from "joigoose";
import mongoose from "mongoose";

// Combine Joi validation with Mongoose schema for user data
const joiSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  // Check for users with complete email verification
  verified: Joi.boolean().default(false),
  avatar: Joi.string().required(),
});

// Convert Joi schema to Mongoose schema and validate
const userSchema = new mongoose.Schema(joigoose(mongoose).convert(joiSchema));
userSchema.set("validateBeforeSave", false);
userSchema.statics.validate = (user) => joiSchema.validate(user);

export default mongoose.model("User", userSchema);
