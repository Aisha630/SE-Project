import Product from "../models/productModel.js";

export async function getCart(req, res) {
  const cartItems = req.cookies.cart || [];
  const cart = await Promise.all(
    cartItems.map(
      async (id) => await Product.findOne({ _id: id, isHold: false })
    )
  );

  res.json(cart);
}

export async function addToCart(req, res) {
  const exists = await Product.exists({ _id: req.body.id, isHold: false });
  if (!exists) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const cartItems = (req.cookies && req.cookies.cart) || [];
  cartItems.push(req.body.id);

  res.cookie("cart", cartItems);
  res.sendStatus(200);
}

export async function deleteFromCart(req, res) {
  const toDelete = req.body.id;
  const cartItems = req.cookies.cart || [];

  res.cookie(
    "cart",
    cartItems.filter((item) => item != toDelete)
  );

  res.sendStatus(200);
}
