import mongoose from "mongoose";

// Token for user verification via email with 1 hour expiry limit
const verificationTokenSchema = mongoose.Schema({
  username: String,
  verificationToken: String,
  createdAt: { type: Date, expires: 3600, default: Date.now },
});

export default mongoose.model("VerificationToken", verificationTokenSchema);
