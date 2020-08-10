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
              .then(result => {
                console.log(`Created user ID: ${result._id}`);
                res.status(201).json({
                  'new_user_created': result
                });
              })
              .catch(err => {
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

router.post('/login', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          'user_login_issue': 'Auth failed or user does not exist'
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            'user_login_issue': 'Auth failed completely'
          });
        }

        if (result) {
          return res.status(200).json({
            'user_login': 'Auth successful'
          });
        }

        return res.status(401).json({
          'user_login_issue': 'Auth failed'
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        'user_login_error': err
      });
    });
});

router.post('/delete/:userId', (req, res) => {
  User.deleteOne({ _id: req.params.userId })
    .then(result => {
      res.status(200).json({
        'deleted_users': result.deletedCount
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        'user_delete_error': err
      });
    });
});

module.exports = router;
