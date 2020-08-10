const router = require('express').Router();
const User = require('../mongoose_models/User');

router.post('/register', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', (req, res) => {
  res.send('Login');
});

module.exports = router;
