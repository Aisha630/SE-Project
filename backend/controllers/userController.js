import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationEmail } from "../email/emailAuth.js";

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

  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const verificationToken = crypto.randomBytes(20).toString("hex");
  const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const user = new User({
    username,
    email,
    password: hash,
    verificationToken,
    tokenExpiry,
  });

  try {
    await user.save();
    await sendVerificationEmail(user);
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

// TODO: DEBUG VERIFICATION CODE RESENDING

export async function verifyEmail(req, res) {
  const { token } = req.query;

  const user = await User.findOne({
    verificationToken: token,
    tokenExpiry: { $gte: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Token is invalid or has expired." });
  }

  user.verified = true;
  user.verificationToken = undefined;
  user.tokenExpiry = undefined;
  await user.save();

  res.send("Email verified successfully! You can now log in.");
}

export async function resendVerification(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email, verified: false });

  if (!user) {
    return res
      .status(404)
      .json({ error: "User not found or already verified." });
  }

  user.verificationToken = crypto.randomBytes(20).toString("hex");
  user.verificationTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

  try {
    await user.save();
    await sendVerificationEmail(user);
    res.json({
      message: "Verification email resent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Error resending verification email:", error);
    res.status(500).json({ error: "Error resending verification email." });
  }
}
