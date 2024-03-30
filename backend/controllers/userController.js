import { SaleProduct } from "../models/productModels.js";
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
