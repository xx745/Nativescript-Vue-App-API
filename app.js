const path = require("path");
const dotenv = require('dotenv');
dotenv.config({ path: `${path.dirname()}/config/.env` });

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 8082;
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&tls=true`;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/all-todos', async (req, res) => {
  const data = await connectDB();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));

async function connectDB() {
  try {
    await dbClient.connect();
    console.log("Connected successfully to the database!");

    const db = dbClient.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION);
    const allTodos = await collection.find({}).toArray();
    
    return allTodos;

  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};