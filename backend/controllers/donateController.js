import User from "../models/userModel.js";
import { DonationProduct } from "../models/productModels";
import {
  sendRejectionEmail,
  sendApprovalEmail,
} from "../services/emailService.js";

export async function createDonationRequest(req, res) {
  const donee = req.user;
  const productId = req.params.id;
  const { requestDescription } = req.body;

  try {
    const product = await DonationProduct.findOne({
      _id: productId,
      isHold: false,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await DonationProduct.updateOne(
      { _id: productId },
      { $push: { requestList: [donee.username, requestDescription] } }
    );

    await User.updateOne(
      { _id: donee._id },
      { $push: { donationHistory: product.name } }
    );

    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

export async function closeDonation(req, res) {
  const productId = req.params.id;
  const { doneeUsername } = req.body;

  try {
    const product = await DonationProduct.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.isHold = true;
    product.buyerUsername = doneeUsername;
    await product.save();

    const acceptedDonee = await User.findOne({ username: doneeUsername });
    const otherDonees = product.requestList
      .filter((request) => request[0] !== doneeUsername)
      .map((request) => request[0]);

    if (acceptedDonee) {
      const productDetails = {
        name: product.name,
        buyer: product.buyerUsername,
        seller: product.seller,
      };
      sendApprovalEmail(productDetails);
    } else {
      return res.status(500).json({ error: "Accepted donee is not found" });
    }

    await Promise.all(
      otherDonees.map(async (doneeUsername) => {
        const donee = await User.findOne({ username: doneeUsername });
        if (donee) {
          sendRejectionEmail(donee.email, product.name);
        }
      })
    );

    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
}
