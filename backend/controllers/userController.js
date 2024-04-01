import Joi from "joi";
import User from "../models/userModel.js";

export async function getUser(req, res) {
  const { username } = req.query;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
}

export async function getSellerDashboard(req, res) {
  const products = await Product.find({ seller: req.user.username });
  res.json(products);
}

export async function rateUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const {
      value: { newRating },
      error,
    } = Joi.object({ newRating: Joi.number().min(0).max(5) }).validate(
      req.body
    );
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const totalRating =
      user.rating.rating * user.rating.numOfRatings + newRating;

    user.rating.rating = totalRating / (user.rating.numOfRatings + 1);
    user.rating.numOfRatings += 1;

    await user.save();
    res.json({ averageRating: user.rating.rating });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}
