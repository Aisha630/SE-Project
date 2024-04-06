import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
  username: String,
  resetToken: String,
  createdAt: { type: Date, expires: 3600, default: Date.now },
});

export default mongoose.model("PasswordReset", passwordResetSchema);
