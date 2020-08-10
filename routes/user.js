const express = require('express');
const router = express.Router();

// READ all
router.get('/', (req, res) => {
  res.send('all users requested OK');
});

// READ one
router.get('/:id', (req, res) => {
  res.send(`User with ID: '${req.params.id}' has been requested.`);
});

// CREATE one
router.post('/add-one', (req, res) => {
  res.send('one user was added successfully');
});

module.exports = router;
