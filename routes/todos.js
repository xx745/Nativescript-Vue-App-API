const router = require('express').Router();
const ToDo = require('../mongoose_models/ToDo');
const checkAuth = require('../express_middleware/checkAuth');

router.get('/all', checkAuth, async (req, res) => {
  await ToDo.find({})
    .exec()
    .then(result => {
      res.status(200).json({
        'results': result
      });
    })
    .catch(err => {
      return res.status(404).json({
        'error': err
      });
    });
});

router.post('/add', checkAuth, async (req, res) => {
  const newToDo = new ToDo({
    text: req.body.text,
    completed: req.body.completed
  });

  try {
    const savedToDo = await newToDo.save();
    console.log(`Created todo ID: ${savedToDo._id}`);
    res.status(200).json({
      'saved_todo': savedToDo
    });
  } catch (err) {
    res.status(400).json({
      'error': err
    });
  }
});

router.post('/delete/:todoId', checkAuth, async (req, res) => {
  ToDo.deleteOne({ _id: req.params.todoId })
    .then(result => {
      res.status(200).json({
        'deleted_todos': result.deletedCount
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        'todo_delete_error': err
      });
    });
});

module.exports = router;
