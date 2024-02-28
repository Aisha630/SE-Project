import Product from "../models/productModel.js";

// TODO:
// 1. Implement categories, subcategories
// 2. Implement filter
// 3. Implement email authorization

export async function getAllProducts(_, res) {
  const products = await Product.find({ isHold: false });
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await Product.findOne({ _id: req.params.id, isHold: false });
  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }
  res.json(product);
};

export async function addProduct(req, res) {
  const { name, price } = req.body
  const seller = req.user.username

  const error = Product.validate({ name, price, seller, isHold: false }).error
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const product = new Product({ name, price, seller, isHold: false });

  try {
    const newProduct = await product.save();
    res.status(200).json(newProduct);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export async function deleteProduct(req, res) {
  const productId = req.params.id;
  const seller = req.user.username;

  try {
    const product = await Product.findOne({ _id: productId, seller });

    if (!product) {
      return res.status(404).json({ error: 'Unable to delete.' });
    }

    await Product.deleteOne({ _id: productId });
    res.status(200).json({ message: 'Product successfully deleted' });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};