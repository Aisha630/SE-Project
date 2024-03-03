import Product from "../models/productModel.js";

export async function getAllProducts(_, res) {
  const products = await Product.find({ isHold: false });
  res.json(products);
}

export async function getProduct(req, res) {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id, isHold: false });
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  res.json(product);
}

export async function addProduct(req, res) {
  const { name, price, category, tags, size, color } = req.body;
  const seller = req.user.username;

  const { value, error } = Product.validate({
    name,
    price,
    category,
    tags,
    size,
    color,
    seller,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const product = new Product(value);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteProduct(req, res) {
  const productId = req.params.id;
  const seller = req.user.username;

  try {
    const product = await Product.findOne({ _id: productId, seller });

    if (!product) {
      return res.status(404).json({ error: "Unable to delete." });
    }

    await Product.deleteOne({ _id: productId });
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

export async function filterProducts(req, res) {
  const { category, tags, sizes, colors } = req.body;
  const query = { isHold: false };

  if (category) {
    query.category = category;
  }

  // AND semantics
  if (tags) {
    query.tags = tags;
  }

  if (sizes && sizes.length > 0 && category === "Clothing") {
    query.size = { $in: Array.isArray(sizes) ? sizes : [sizes] };
  }

  if (colors && colors.length > 0 && category === "Clothing") {
    query.color = { $in: Array.isArray(colors) ? colors : [colors] };
  }

  const products = await Product.find(query);
  res.json(products);
}
