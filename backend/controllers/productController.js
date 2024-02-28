import Product from "../models/productModel.js";

export async function getAllProducts(_, res) {
  const products = await Product.find();
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }
  res.json(product);
};

export async function addProduct(req, res) {
  const { name, price } = req.body
  const seller = req.user.username

  const error = Product.validate({ name, price, seller }).error
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const product = new Product({ name, price, seller });

  try {
    const newProduct = await product.save();
    res.status(200).json(newProduct);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
