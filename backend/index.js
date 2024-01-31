require("dotenv").config()

import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
const app = express();

const mongoConnectionString = process.env.mongoDBConnectionString;
const port = 5003;

app.use(cors());

connect(mongoConnectionString)
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