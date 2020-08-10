const router = require('express').Router();
const ToDo = require('../mongoose_models/ToDo');

router.post('/add', async (req, res) => {
  const newToDo = new ToDo({
    text: req.body.text,
    completed: req.body.completed
  });

  try {
    const savedToDo = await newToDo.save();
    res.send(savedToDo);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
