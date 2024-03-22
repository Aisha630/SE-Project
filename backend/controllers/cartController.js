import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { sendCheckoutEmail } from "../services/emailService.js";

export async function getCart(req, res) {
  const cartIDs = getIDs(req);
  const cart = await fetchCartItems(cartIDs);
  res.json(cart);
}

export async function addToCart(req, res) {
  const exists = await Product.exists({ _id: req.body.id, isHold: false });
  if (!exists) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const cartIDs = getIDs(req).push(req.body.id);
  res.cookie("cart", cartItems);
  res.sendStatus(200);
}

export async function deleteFromCart(req, res) {
  const toDelete = req.body.id;
  const cartIDs = getIDs(req);

  res.cookie(
    "cart",
    cartIDs.filter((ID) => ID != toDelete)
  );

  res.sendStatus(200);
}

export async function checkout(req, res) {
  try {
    const cartIDs = getIDs(req);
    const cart = await fetchCartItems(cartIDs);

    const itemCheckouts = cart.map(async (item) => {
      item.isHold = true;
      const save = item.save();

      const buyer = await User.findOne({ username: req.body.username });
      const seller = await User.findOne({ username: item.seller });
      const productDetails = { name: item.name, price: item.price };
      const email = sendCheckoutEmail(seller, buyer, productDetails);

      return Promise.all([save, email]);
    });

    await Promise.all(itemCheckouts);
    res.sendStatus(200);

  } catch (error) {
    res.status(500).json({ error: 'An error occurred during checkout' });
  }
}


function getIDs(req, _) {
  return (req.cookies && req.cookies.cart) || [];
}

async function fetchCartItems(cartIDs) {
  const cartItems = await Promise.all(
    cartIDs.map(id => Product.findOne({ _id: id, isHold: false }))
  );
  return cartItems.filter(item => item !== null);

}