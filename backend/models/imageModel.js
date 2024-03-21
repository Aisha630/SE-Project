import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  mimeType: String,
});

export default mongoose.model("Image", imageSchema);
