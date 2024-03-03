import Product from "../models/productModel.js";

// Retrieve all products that are not currently on hold
export async function getAllProducts(_, res) {
  const products = await Product.find({ isHold: false });
  res.json(products);
}

// Retrieve a specific product by its ID
export async function getProduct(req, res) {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id, isHold: false });
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  res.json(product);
}

// Add a new product to the database
export async function addProduct(req, res) {
  const { name, price, description, brand, category, tags, size, color, condition } = req.body;
  const seller = req.user.username;

  // Map uploaded file paths to an array
  let images = undefined;
  if (req.files) {
    images = req.files.map(file => file.path.replace(/\\/g, '/').replace(/^\.\./, ''));
  }

  // Validate the product details against the Product model
  const { value, error } = Product.validate({
    name,
    price,
    description,
    brand,
    category,
    tags: Array.isArray(tags) ? tags : [tags],
    size,
    color,
    seller,
    condition,
    images,
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

// Delete a product by its ID - seller's functionality after payment
export async function deleteProduct(req, res) {
  const productId = req.params.id;
  const seller = req.user.username;

  try {
    // Ensure that the product exists and belongs to the seller
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

// Filter products based on criteria like category, tags, sizes, and colors
export async function filterProducts(req, res) {
  const { category, tags, sizes, colors } = req.body;
  const query = { isHold: false };

  // Build the query based on provided filter criteria
  if (category) {
    query.category = category;
  }

  // AND semantics
  if (tags) {
    query.tags = tags;
  }

  // Filter by size and color if specified and valid
  if (sizes && sizes.length > 0 && category === "Clothing") {
    query.size = { $in: Array.isArray(sizes) ? sizes : [sizes] };
  }

  if (colors && colors.length > 0 && category === "Clothing") {
    query.color = { $in: Array.isArray(colors) ? colors : [colors] };
  }

  // Query the database with the built query
  const products = await Product.find(query);
  res.json(products);
}
