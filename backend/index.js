require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const mongoConnectionString = process.env.mongoDBConnectionString;
const port = 5003;

app.use(cors());

mongoose.connect(mongoConnectionString)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Hello world!');
});