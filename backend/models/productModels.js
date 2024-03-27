import Joi from "joi";
import joigoose from "joigoose";
import mongoose from "mongoose";

import { productBaseJoi, Product } from "./productBase.js";

const saleProductJoi = productBaseJoi.concat(
  Joi.object({
    price: Joi.number().min(0).required(),
    isHold: Joi.boolean().default(false),
  })
);

const donationProductJoi = productBaseJoi.concat(
  Joi.object({
    buyerUsername: Joi.string().required(),
  })
);

const auctionProductJoi = productBaseJoi.concat(
  Joi.object({
    startingBid: Joi.number().min(0).required(),
    endTime: Joi.date().required(),
  })
);

const saleProductSchema = new mongoose.Schema(
  joigoose(mongoose).convert(saleProductJoi),
  { timestamps: true }
);
const donationProductSchema = new mongoose.Schema(
  joigoose(mongoose).convert(donationProductJoi),
  { timestamps: true }
);
const auctionProductSchema = new mongoose.Schema(
  joigoose(mongoose).convert(auctionProductJoi),
  { timestamps: true }
);

saleProductSchema.set("validateBeforeSave", false);
donationProductSchema.set("validateBeforeSave", false);
auctionProductSchema.set("validateBeforeSave", false);

saleProductSchema.statics.validate = (product) =>
  saleProductJoi.validate(product);
donationProductSchema.statics.validate = (product) =>
  donationProductJoi.validate(product);
auctionProductSchema.statics.validate = (product) =>
  auctionProductJoi.validate(product);

export const SaleProduct = Product.discriminator(
  "SaleProduct",
  saleProductSchema
);
export const DonationProduct = Product.discriminator(
  "DonationProduct",
  donationProductSchema
);
export const AuctionProduct = Product.discriminator(
  "AuctionProduct",
  auctionProductSchema
);
