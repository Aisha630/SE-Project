const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();


const mongoConnectionString = process.env.mongoDBConnectionString; // this is the connection string to your MongoDB database. You can get this from the MongoDB Atlas dashboard.

const client = new MongoClient(mongoConnectionString) // This is an object that refereces the connection to your MongoDB database. You will use this object to interact with your database.
client.connect().then(() => { console.log('Connected to MongoDB') }).catch(err => console.log(err)); // This connects your client object to your database. If the connection is successful, it will print "Connected to MongoDB" in the console. If the connection fails, it will print the error message in the console.
const database = client.db('STA') // Create a database object that references the database you want to use. In this case, the database name is "STA". if the database does not exist, it will be created automatically.
const collection = database.collection('productsSTA') // Create a collection object that references the collection within your database that you want to use. In this case, the collection name is "productsSTA". if the collection does not exist, it will be created automatically.

const port = 5003;
app.use(cors()); // this just allows cross-origin resource sharing. You can read more about this here: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

mongoose.connect(mongoConnectionString).then(() => { console.log('Connected to MongoDB') }).catch(err => console.log(err)); // the path here is the path to your database. this path tells mongoose where your database is located. 

app.get('/', (req, res) => { // When a GET request comes at this path, the callback function will be executed. In this case, the callback function sends the string "Hello World!" to the client.
  res.send('Hello World!');
});

app.listen(port, () => { // This starts the server and listens for requests on port 5003. When a request comes, the callback function will be executed.
  console.log(`Server running on port ${port}`);
});