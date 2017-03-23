const express = require('express'),
      router = express.Router(),
      User = require('../models/user').User,
      path = require('path'),
      HttpError = require('../error/index').HttpError;

router.get('/users', function(req, res) {
  User.find(function(err, users) {
    if (err) next(err);
    res.status(200).send(users);
  });
});

//now we need to link the prond end request here and test
router.post('/register', function(req, res, next) {
  let username = req.body.username,
      password = req.body.password,
      email = req.body.email;

  User.findOne({username: username}, function(err, user) {
    if (err) return next(err);

    if (user) {
      next(new HttpError(403, 'Such user exist'));
    } else {
      let user = new User ({
        username: username,
        password: password,
        email: email
      });

      user.save(function(err) {
        if (err) return next(err);
        console.log(username, password);
        req.session.user = user._id;
        console.log('new user creater: ' + username);
        res.send(user);
      });
    }
  });
});

router.post('/signin', function(req, res, next) {
  let username = req.body.username,
      password = req.body.password;


  User.findOne({username: username}, function(err, user) {
    if (err) return next(err);

    if (user) {
      if (user.checkPassword(password)) {
        req.session.user = user._id;
        console.log(username + ' has logged in');
        res.send(user);
      } else {
        next(new HttpError(401, 'Password is not correct'));
      }
    } else {
      next(new HttpError(404, 'User not found'));
    }
  });
});

router.post('signout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

router.get('/home/:user', function(req, res) {
  if (req.user.username === req.params.user) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  } else {
    res.redirect('/');
  }
});

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = router;


