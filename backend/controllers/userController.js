import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";


export async function signup(req, res) {
  const { username, email, password } = req.body;

  const error = User.validate({ username, email, password }).error;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }
  if (!email.endsWith('@lums.edu.pk')) {
    return res.status(400).json({ error: "Only @lums.edu.pk emails are allowed" });
  }
  const exists = await User.findOne({ username });
  if (exists) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const token = jwt.sign({ username }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = new User({ username, email, password:hash });

  try {
    
    user.save();
    res.status(200).json({ username, token });
    // res.status(200).json({ message: "User created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (!bcrypt.compare(password, user.password)) {
    return res.status(401).send({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });

  const { username } = user;

  res.status(200).json({ username, email, token });
}
