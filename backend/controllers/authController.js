import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import VerificationToken from "../models/verificationTokenModel.js";
import PasswordReset from "../models/passwordResetModel.js";
import { sendVerificationEmail } from "../services/emailService.js";
import { sendPasswordResetEmail } from "../services/emailService.js";

export async function signup(req, res) {
  const { username, email, password } = req.body;
  const avatar = `https://api.dicebear.com/8.x/thumbs/svg?backgroundColor=F97171&radius=30&seed=${username}`;

  // Validate user input against the user model
  const error = User.validate({ username, email, password, avatar }).error;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check for password strength
  //if (
  //  process.env.BUILD_MODE == "PROD" &&
  //  !validator.isStrongPassword(password)
  //) {
  //  return res.status(400).json({ error: "Password not strong enough" });
  //}

  // Ensure only lums domains are authorized
  if (!email.endsWith("@lums.edu.pk")) {
    return res
      .status(400)
      .json({ error: "Only @lums.edu.pk emails are allowed" });
  }

  // Ensure usernames are unique
  const exists = await User.findOne({ $or: [{ username }] });
  if (exists) {
    return res.status(400).json({ error: "Username or email already exists" });
  }

  // Salt and hash password before storing in db for security
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create a user and provide a jwt token for authentication
  const user = new User({
    username,
    email,
    password: hash,
    avatar,
    verified: process.env.BUILD_MODE == "DEV",
  });

  // Save user to database
  try {
    await user.save();

    if (process.env.BUILD_MODE == "PROD") {
      // Generate a verification token to ensure email ID is valid
      const token = crypto.randomBytes(20).toString("hex");
      const verificationToken = new VerificationToken({
        username,
        verificationToken: token,
      });

      await verificationToken.save();
      await sendVerificationEmail(user, token);

      res
        .status(200)
        .json({ message: "Please check your email to verify your account." });
    } else {
      const token = jwt.sign({ username }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({ username, token });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

export async function signin(req, res) {
  const { username, password } = req.body;

  // Ensures user exists in db with the same password
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

  // Ensures user's lums email has been verified
  if (!user.verified) {
    return res.status(403).json({ error: "Email not verified" });
  }

  // Generates jwt token for authentication
  const token = jwt.sign({ username }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });

  const notifications = await Notification.find({ userId: user._id }).lean();
  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  res.status(200).json({
    username,
    token,
    notifications,
    unreadCount,
  });
}

// Verifies the email of the user by checking the provided token
export async function verifyEmail(req, res) {
  const { token } = req.query;

  const verificationToken = await VerificationToken.findOne({
    verificationToken: token,
  });

  if (!verificationToken) {
    return res.send({ error: "The token is invalid." });
  }

  // Find the user associated with the verification token
  const user = await User.findOne({
    username: verificationToken.username,
  });

  // Mark the user as verified and delete the token
  user.verified = true;
  await user.save();

  await VerificationToken.deleteOne({ verificationToken: token });

  res.send("Email verified successfully! You can now log in.");
}

// Resends the verification email to the user in case of token expiry
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

  // Delete any existing verification tokens for the user
  await VerificationToken.deleteMany({ username: user.username });

  // Generate a new verification token
  const token = crypto.randomBytes(20).toString("hex");
  const verificationToken = new VerificationToken({
    username: user.username,
    verificationToken: token,
  });

  // Saving token to db and sending verification email
  try {
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

function generateNumericToken() {
  const token = Math.floor(100000 + Math.random() * 900000);
  return token.toString();
}

export async function requestPasswordReset(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const resetToken = generateNumericToken();

  const passwordReset = new PasswordReset({
    username: user.username,
    resetToken,
  });

  await passwordReset.save();
  await sendPasswordResetEmail(user, resetToken);

  res.json({ message: "Please check your email to reset your password." });
}

export async function resetPassword(req, res) {
  const { resetToken, newPassword } = req.body;

  const passwordResetDoc = await PasswordReset.findOne({ resetToken });
  if (!passwordResetDoc) {
    return res.status(400).json({ error: "Token is invalid or has expired." });
  }

  const user = await User.findOne({
    username: passwordResetDoc.username,
  });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  await PasswordReset.deleteOne({ resetToken });

  res.json({ message: "Password has been reset successfully." });
}
