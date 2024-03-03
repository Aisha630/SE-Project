import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

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
  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Salt and hash password before storing in db
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create a user and provide a jwt token for authentication
  const user = new User({ username, email, password: hash });
  const token = jwt.sign({ username }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });

  // Save user to database
  try {
    user.save();
    res.status(200).json({ username, email, token });

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

  // Ensures verified user exists in db
  if (!user || !user.verified) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Checks if entered password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).send({ error: "Invalid credentials" });
  }

  // Generates jwt token for authentication
  const token = jwt.sign({ username }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });

  res.status(200).json({ username, token });
}