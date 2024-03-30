import nodemailer from "nodemailer";

import User from "../models/userModel.js";
import authEmail from "../util/authEmail.js";
import checkoutEmail from "../util/checkoutEmail.js";
import { bidEmail } from "../util/auctionEmails.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "secondtimearound.gp2@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendVerificationEmail(user, token) {
  let verificationLink = `http://localhost:${process.env.PORT}/verify?token=${token}`;
  let email = authEmail(user, verificationLink);

  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error(error);
  }
}

export async function sendCheckoutEmail(seller, buyer, product) {
  let email = checkoutEmail(seller, buyer, product);

  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error(error);
  }
}

export async function sendBidEmail(product) {
  const seller = await User.findOne({ username: product.seller });
  let email = bidEmail(seller.email, product);

  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error(error);
  }
}
