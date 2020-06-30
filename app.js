const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '/config/.env') });
const { connectDB, dbClient } = require('./connectDB');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8082;
const dbName = process.env.DB_NAME;
const dbCollection = process.env.DB_COLLECTION;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/all-todos', async (req, res) => {
  await connectDB();
  const db = dbClient.db(dbName);
  const col = db.collection(dbCollection)
  const allTodos = await col.find({}).toArray();

  res.json(allTodos);
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
