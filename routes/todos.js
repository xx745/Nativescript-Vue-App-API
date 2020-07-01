const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '../config/.env' });
const express = require('express');
const router = express.Router();
const { connectDB, dbClient } = require('../connectDB');
const dbName = process.env.DB_NAME;
const dbCollection = process.env.DB_COLLECTION;

router.get('/', async (req, res) => {
  await connectDB();
  const db = dbClient.db(dbName);
  const col = db.collection(dbCollection)
  const allTodos = await col.find({}).toArray();

  res.json(allTodos);
});

module.exports = router;