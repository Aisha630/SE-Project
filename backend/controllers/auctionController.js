import { sendNotSoldEmail, sendSoldEmail } from "../services/emailService.js";
import { Product } from "../models/productBase.js";
import io from "../app.js";
import Notification from "../models/notifModel.js";

export async function bidOnProduct(req, res) {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id, isHold: false });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (product.__t != "AuctionProduct") {
    return res
      .status(400)
      .json({ error: "Product is not an auction product." });
  }

  const {
    value: { bid },
    error,
  } = Joi.object({ bid: Joi.number().min(0) }).validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  if (bid <= product.currentBid) {
    return res
      .status(400)
      .json({ error: "Bid needs to be higher than current bid" });
  }

  product.currentBid = bid;
  product.buyerUsername = req.user.username;

  try {
    await product.save();
    const seller = await User.findOne({ username: product.seller });

    const notification = new Notification({
      userId: seller._id,
      message: `A new bid was placed by ${req.user.username} on "${product.name}".`,
      status: "unread",
    });
    await notification.save();

    if (seller.connectionID) {
      io.to(seller.connectionID).emit("newBid", {
        notificationId: notification._id.toString(),
        message: notification.message,
      });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

export async function closeAuction(id) {
  const product = await Product.findOne({ _id: id, isHold: false });
  if (!product) {
    return;
  }

  product.isHold = true;
  console.log(`Auction for product: ${id} closed`);
  await product.save();

  const productDetails = {
    name: product.name,
    currentBid: product.currentBid,
    seller: product.seller,
    ...(product.buyerUsername && { buyer: product.buyerUsername }),
  };

  if (product.buyerUsername) {
    sendSoldEmail(productDetails);
  } else {
    sendNotSoldEmail(productDetails);
  }
}
