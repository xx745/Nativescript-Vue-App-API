const express = require('express');
const router = express.Router();

// READ all
router.get('/', (req, res) => {
  res.send('all subscribers requested OK');
});

// READ one
router.get('/:id', (req, res) => {
  res.send('one subscriber requested OK');
});

// CREATE one
router.post('/add-one', (req, res) => {
  res.send('one subscriber added OK');
});

module.exports = router;