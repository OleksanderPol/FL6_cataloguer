var express = require('express'),
    router = express.Router(),
    User = require('../models/user').User,
    Category = require('../models/category').Category,
    Item = require('../models/item').Item,
    path = require('path'),
    HttpError = require('../error/index').HttpError;

router.get('/users', function(req, res) {
  User.find(function(err, users) {
    if (err) next(err);
    res.status(200).send(users);
  });
});

router.post('/register', function(req, res, next) {
  var username = req.body.username,
      password = req.body.password,
      email = req.body.email;

  User.findOne({username: username}, function(err, user) {
    if (err) return next(err);

    if (user) {
      next(new HttpError(403, 'Such user exist'));
    } else {
      var user = new User ({
        username: username,
        password: password,
        email: email
      });

      user.save(function(err) {
        if (err) return next(err);
        req.session.user = user._id;
        console.log('new user creater: ' + username);
        res.send(user);
      });
    }
  });
});

router.post('/signin', function(req, res, next) {
  var username = req.body.username,
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

router.get('/categories', function(req, res, next) {
  if (!req.user) {
    return next(401);
  }

  Category.find({users: req.user._id}, {name: 1, _id: 0}, function(err, categories) {
    if (err) {
      return next(err);
    }
    Item.find({owner: req.user._id}, function(err, itemCell) {
      if (err) {
        return next(err);
      }
      //mongoose document does not allow adding props, we need to convert it to plain obj firstly.
      var result = categories.map(function(category, index) {
        category = category.toJSON();
        category.amountOfItems = itemCell[index] ? itemCell[index].items.length : 0;
        return category;
      });

      res.json(result);
    });
  });
});

router.get('/:category/items', function(req, res, next) {
  var categoryName = req.params.category;

  if (!req.user) {
    return next(401);
  }

  Item.findOne({category: categoryName}, function(err, itemCell) {
    if (err) {
      return next(err);
    }

    res.json(itemCell.items);
  });
});

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = router;


