const mongoose = require('mongoose'); // this imports mongoose library
const Schema = mongoose.Schema; // get the Schema class from mongoose

// Here, a productSchema is created using the Schema class. This schema defines the structure of a "Product" document in the MongoDB collection. Each field represents a property of a product, and it specifies the data type and whether it is required.
const productSchema = new Schema({ //
    name:
    {
        type: String,
        required: true,
    },
    description:
    {
        type: String,
        required: true,
    },
    image:
    {
        type: String,
        required: true,
    },
    category:
    {
        type: String,
        required: true,
    },
    quantity:
    {
        type: Number,
        required: true,
    },
    price:
    {
        type: Number,
        required: true,
    },
    brand:
    {
        type: String,
        required: true,
    },
    thumbnail:
    {
        type: String,
        required: true,
    },
    discount:
    {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Product', productSchema); 
// This exports a Mongoose model named 'Product'. This model is created based on the defined productSchema, and it allows you to interact with the "products" collection in the MongoDB database using Mongoose methods.