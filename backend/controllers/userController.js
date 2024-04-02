import Joi from "joi";
import User from "../models/userModel.js";
import { Product } from "../models/productBase.js";

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
    const { id } = req.params; // The ID of the user being rated
    const raterId = req.user._id; // The ID of the user doing the rating

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (id === raterId.toString()) {
      return res.status(400).json({ error: "User cannot rate themselves" });
    }

    if (user.ratedBy.includes(raterId)) {
      return res
        .status(403)
        .json({ error: "You have already rated this user" });
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

    user.ratedBy.push(raterId);
    await user.save();

    res.json({ averageRating: user.rating.rating });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}
