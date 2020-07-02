const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '../config/.env' });
const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongodb').ObjectID;
const { connectDB, dbClient } = require('../connectDB');
const dbName = process.env.DB_NAME;
const dbCollection = process.env.DB_COLLECTION;

let db;
let col;

(async () => {
  await connectDB();
  db = dbClient.db(dbName);
  col = db.collection(dbCollection);
})();

async function getTodo(req, res, next) {
  const todoId = ObjectID(req.params.id);
  let todo;

  try {
    todo = await col.findOne({_id: todoId});
    if (!todo) {
      return res.status(404).json({ message: `Cannot find todo with ID: ${req.params.id}` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.todo = todo;
  next();
};

router.get('/', async (req, res) => {
  try {
    const allTodos = await col.find({}).toArray();
    res.json(allTodos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getTodo, (req, res) => {
  res.json(res.todo)
});

router.post('/add-todo', async (req, res) => {
  try {
    const newTodo = { todoText: req.body.todoText };

    col.insertOne(newTodo, (err, result) => {
      if (result) console.log(`Inserted ${result.insertedCount} todo successfully!`);
      if (err) console.error(err);
    });

    res.status(201).json(newTodo);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;