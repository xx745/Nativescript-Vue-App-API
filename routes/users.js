const router = require('express').Router();
const User = require('../mongoose_models/User');
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          'user_error': 'email already registered'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              'bcrypt_error': err
            });
          } else {
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash
            });
            newUser.save()
              .then((result) => {
                console.log(`Created user ID: ${result._id}`);
                res.status(201).json({
                  'new_user_created': result
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  'user_error': err
                });
              });
          }
        });
      }
    });
});

router.post('/delete/:userId', (req, res) => {
  User.deleteOne({ _id: req.params.userId })
    .then((result) => {
      res.status(200).json({
        'deleted_users': result.deletedCount
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        'user_delete_error': err
      });
    });
});

module.exports = router;
