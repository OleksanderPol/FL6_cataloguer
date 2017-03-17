const express = require('express'),
      router = express.Router(),
      User = require('../models/user').User,
      path = require('path');

router.get('/', function(req, res) {
  res.send('api works');
});

router.get('/users', function(req, res) {
  User.find(function(err, users) {
    if (err) next(err);
    res.status(200).send(users);
  });
});

//this file is created just to test the post requests
router.get('/signin', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'signin.html'));
});

//now we need to link the prond end request here and test
router.post('/signin', function(req, res, next) {
  let username = req.body.username,
      password = req.body.password,
      email = req.body.email;

  User.findOne({username: username}, function(err, user) {
    if (err) return next(err);
    if (user) {
      res.send('Username ' + username + ' already exist');
    } else {
      let user = new User ({
        username: username,
        password: password,
        email: email
      });

      user.save(function(err) {
        if (err) return next(err);
        //200 OK
      });
    }
  });
});

module.exports = router;


