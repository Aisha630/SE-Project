import mongoose from "mongoose";

const verificationTokenSchema = mongoose.Schema({
  username: String,
  verificationToken: String,
  createdAt: { type: Date, expires: 3600, default: Date.now },
});

export default mongoose.model("VerificationToken", verificationTokenSchema);
