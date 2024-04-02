import Joi from "joi";

import User from "../models/userModel.js";
import { DonationProduct } from "../models/productModels.js";
import {
  sendRejectionEmail,
  sendApprovalEmail,
} from "../services/emailService.js";

export async function createDonationRequest(req, res) {
  const donee = req.user;
  const productId = req.params.id;
  const {
    value: { requestDescription },
    error,
  } = Joi.object({ requestDescription: Joi.string().required() }).validate(
    req.body
  );
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const product = await DonationProduct.findOne({
      _id: productId,
      isHold: false,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const existingIndex = product.requestList.findIndex(
      (entry) => entry[0] === donee.username
    );

    if (existingIndex !== -1) {
      product.requestList[existingIndex][1] = requestDescription;
    } else {
      product.requestList.push([donee.username, requestDescription]);

      await User.updateOne(
        { _id: donee._id },
        { $push: { donationHistory: product.name } }
      );
    }

    await product.save();
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

export async function closeDonation(req, res) {
  const productId = req.params.id;
  const {
    value: { doneeUsername },
    error,
  } = Joi.object({ doneeUsername: Joi.string().required() }).validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const product = await DonationProduct.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const acceptedDonee = await User.findOne({ username: doneeUsername });
    if (
      acceptedDonee &&
      product.requestList.map((x) => x[0]).includes(acceptedDonee.username)
    ) {
      const productDetails = {
        name: product.name,
        buyer: doneeUsername,
        seller: product.seller,
      };

      product.isHold = true;
      product.buyerUsername = doneeUsername;
      await product.save();

      sendApprovalEmail(productDetails);
    } else {
      return res.status(400).json({ error: "Accepted donee is not found" });
    }

    const otherDonees = product.requestList
      .map((request) => request[0])
      .filter((username) => username !== doneeUsername);

    await Promise.all(
      otherDonees.map(async (doneeUsername) => {
        const donee = await User.findOne({ username: doneeUsername });
        if (donee) {
          await sendRejectionEmail(donee.email, product);
        }
      })
    );

    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
}