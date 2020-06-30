const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '/config/.env') });
const { connectDB, dbClient } = require('./connectDB');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8082;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/all-todos', async (req, res) => {
  await connectDB();
  const db = dbClient.db(process.env.DB_NAME);
  const col = db.collection(process.env.DB_COLLECTION)
  const allItems = await col.find({}).toArray();

  res.json(allItems);
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
