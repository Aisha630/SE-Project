import Product from "../models/productModel.js";

export async function getAllProducts (_, res) {
    const products = await Product.find();
    res.json(products);
}

export async function getProductById (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function addProduct (req, res) {
  const product = new Product({
    category: req.body.category,
    size: req.body.size,
    color: req.body.color,
    condition: req.body.condition,
    productName: req.body.productName,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    seller: req.user._id 
  });

  try {
    const newProduct = await product.save();
    res.status(200).json(newProduct);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
