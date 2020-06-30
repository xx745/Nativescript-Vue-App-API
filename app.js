import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '/config/.env') });
import { connectDB, dbClient } from './connectDB';
import express from 'express';
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 8082;
const dbName = process.env.DB_NAME;
const dbCollection = process.env.DB_COLLECTION;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('This API does not use PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('This API does not use DELETE HTTP method');
});

app.get('/all-todos', async (req, res) => {
  await connectDB();
  const db = dbClient.db(dbName);
  const col = db.collection(dbCollection)
  const allTodos = await col.find({}).toArray();

  res.json(allTodos);
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
