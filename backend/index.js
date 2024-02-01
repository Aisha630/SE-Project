require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const baseRoutes = require('./routes/base.js')
const userRoutes = require('./routes/user.js')

const app = express();

app.use(cors());
app.use(express.json());
app.use(baseRoutes)
app.use(userRoutes)

const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));