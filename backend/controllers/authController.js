import User from "../models/userModel.js";
import VerificationToken from "../models/verificationTokenModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import validator from "validator";

export async function signup(req, res) {
  const { username, email, password } = req.body;

  const error = User.validate({ username, email, password }).error;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  //if (!validator.isStrongPassword(password)) {
  //  return res.status(400).json({ error: "Password not strong enough" });
  //}

  if (!email.endsWith("@lums.edu.pk")) {
    return res
      .status(400)
      .json({ error: "Only @lums.edu.pk emails are allowed" });
  }

  const exists = await User.findOne({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).json({ error: "Username or email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password: hash,
  });

  const token = crypto.randomBytes(20).toString("hex");
  const verificationToken = new VerificationToken({
    username,
    verificationToken: token,
  });

  try {
    await user.save();
    await verificationToken.save();

    await sendVerificationEmail(user, token);

    res
      .status(200)
      .json({ message: "Please check your email to verify your account." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

export async function signin(req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({
    username,
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).send({ error: "Invalid credentials" });
  }

  if (!user.verified) {
    return res.status(403).json({ error: "Email not verified" });
  }

  const token = jwt.sign({ username }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });

  res.status(200).json({ username, token });
}

export async function verifyEmail(req, res) {
  const { token } = req.query;

  const verificationToken = await VerificationToken.findOne({
    verificationToken: token,
  });

  if (!verificationToken) {
    return res.send({ error: "The token is invalid." });
  }

  const user = await User.findOne({
    username: verificationToken.username,
  });

  user.verified = true;
  await user.save();

  await VerificationToken.deleteOne({ verificationToken: token });

  res.send("Email verified successfully! You can now log in.");
}

export async function resendVerification(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: '"email" is required' });
  }

  const user = await User.findOne({ email, verified: false });

  if (!user) {
    return res
      .status(404)
      .json({ error: "User not found or already verified." });
  }

  await VerificationToken.deleteMany({ username: user.username });

  const token = crypto.randomBytes(20).toString("hex");
  const verificationToken = new VerificationToken({
    username: user.username,
    verificationToken: token,
  });

  try {
    await user.save();
    await verificationToken.save();

    await sendVerificationEmail(user, token);

    res.json({
      message: "Verification email resent. Please check your inbox.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function sendVerificationEmail(user, token) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "secondtimearound.gp2@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let verificationLink = `http://localhost:${process.env.PORT}/verify?token=${token}`;
  let mailOptions = {
    from: '"Second Time Around" <secondtimearound.gp2@gmail.com>',
    to: user.email,
    subject: "Verify Your Email",
    html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Welcome to Second Time Around!</h2>
            <p>Thank you for signing up. Please click the button below to verify your email address and activate your account.</p>
            <a href="${verificationLink}" style="background-color: #58A75B; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px; margin: 10px 0;">Verify Email</a>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}
