import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  category: { type: String, enum: ['Men', 'Women', 'Technology', 'Miscellaneous'] },
  size: { type: String },
  color: { type: String },
  condition: { type: String, enum: ['old', 'new'] },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  brand: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Product = mongoose.model('Product', productSchema);
export default Product