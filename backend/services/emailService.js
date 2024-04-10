import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import authEmail from "../util/authEmail.js";
import checkoutEmail from "../util/checkoutEmail.js";
import passwordResetEmail from "../util/passwordResetEmail.js";
import { notSoldEmail, soldEmail } from "../util/auctionEmails.js";
import { donationApproval, donationRejection } from "../util/donationEmails.js";

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

export async function sendPasswordResetEmail(user, resetToken) {
  let email = passwordResetEmail(user, resetToken);

  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error(error);
  }
}

export async function sendApprovalEmail(product) {
  const donar = await User.findOne({ username: product.seller });
  const acceptedDonee = await User.findOne({ username: product.buyer });

  let email = donationApproval(donar, acceptedDonee, product);

  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error(error);
  }
}

export async function sendRejectionEmail(rejectedDonee, product) {
  let email = donationRejection(rejectedDonee, product);

  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error(error);
  }
}

export async function sendSoldEmail(product) {
  const seller = await User.findOne({ username: product.seller });
  const buyer = await User.findOne({ username: product.buyer });

  let email = soldEmail(seller, buyer, product);

  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error(error);
  }
}

export async function sendNotSoldEmail(product) {
  const seller = await User.findOne({ username: product.seller });
  let email = notSoldEmail(seller, product);

  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.error(error);
  }
}