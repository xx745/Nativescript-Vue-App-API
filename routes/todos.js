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

router.get('/all', async (req, res) => {
  try {
    const allTodos = await col.find({}).toArray();

    res.json(allTodos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const todoId = ObjectID(req.params.id);
  try {
    const todo = await col.findOne({_id: todoId});

    res.status(200).json(todo)
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
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