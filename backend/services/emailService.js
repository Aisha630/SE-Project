import nodemailer from 'nodemailer'
import authEmail from '../util/authEmail.js'
import checkoutEmail from '../util/checkoutEmail.js'

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
