import User from "../models/userModel.js";
import io from "../app.js";
import { SaleProduct } from "../models/productModels.js";
import { sendCheckoutEmail } from "../services/emailService.js";

export async function getCart(req, res) {
  const cartIDs = getIDs(req);
  const cart = await fetchCartItems(cartIDs);
  res.json(cart);
}

export async function addToCart(req, res) {
  const exists = await SaleProduct.exists({ _id: req.body.id, isHold: false });
  if (!exists) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const cartItems = getIDs(req);
  cartItems.push(req.body.id);

  res.cookie("cart", cartItems);
  res.sendStatus(200);
}

export async function deleteFromCart(req, res) {
  const toDelete = req.query.id;
  const cartIDs = getIDs(req);

  res.cookie(
    "cart",
    cartIDs.filter((ID) => ID != toDelete)
  );

  res.sendStatus(200);
}

export async function checkout(req, res) {
  try {
    const buyer = req.user;

    const cartIDs = getIDs(req);
    const cart = await fetchCartItems(cartIDs);

    const itemCheckouts = cart.map(async (item) => {
      item.isHold = true;
      item.buyerUsername = buyer.username;
      const save = item.save();

      const seller = await User.findOne({ username: item.seller });
      const productDetails = { name: item.name, price: item.price };
      const email = sendCheckoutEmail(seller, buyer, productDetails);

      if (seller.connectionID) {
        io.to(seller.connectionID).emit("productSold", {
          message: `Your product "${item.name}" has been sold to ${buyer.username}.`,
        });
      }

      return Promise.all([save, email]);
    });

    await Promise.all(itemCheckouts);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred during checkout" });
  }
}

function getIDs(req, _) {
  return (req.cookies && req.cookies.cart) || [];
}

async function fetchCartItems(cartIDs) {
  const cartItems = await Promise.all(
    cartIDs.map((id) => SaleProduct.findOne({ _id: id, isHold: false }))
  );
  return cartItems.filter((item) => item !== null);
}
