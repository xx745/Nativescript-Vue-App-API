const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8082;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`));

client.connect(err => {
  console.log("Connected successfully to database!");
  client.close();
});