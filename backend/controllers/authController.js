import User from "../models/userModel.js";
import VerificationToken from "../models/verificationTokenModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import validator from "validator";

export async function signup(req, res) {
  const { username, email, password } = req.body;

  // Validate user input against the user model
  const error = User.validate({ username, email, password }).error;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check for password strength
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }

  // Ensure only lums domains are authorized
  if (!email.endsWith("@lums.edu.pk")) {
    return res
      .status(400)
      .json({ error: "Only @lums.edu.pk emails are allowed" });
  }

  // Ensure usernames are unique
  const exists = await User.findOne({ $or: [{ username }, { email }] });
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
  });

  // Generate a verification token to ensure email ID is valid
  const token = crypto.randomBytes(20).toString("hex");
  const verificationToken = new VerificationToken({
    username,
    verificationToken: token,
  });

  // Save user and token to database
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

  res.status(200).json({ username, token });
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

// Helper function to send the verification email to the user
async function sendVerificationEmail(user, token) {
  // Configure the transporter for our custom email using nodemailer
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "secondtimearound.gp2@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Generate unique link using verification token to verify and redirect user
  let verificationLink = `http://localhost:${process.env.PORT}/verify?token=${token}`;

  // Define mailing options with verification link button
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
