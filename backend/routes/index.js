const express = require('express'),
      router = express.Router();
      User = require('models/user').User;

router.get('/', function(req, res) {
  res.send('api works');
});

router.get('/users', function(req, res) {
  User.findOne({username: 'Alex'}, function(err, user) {
    if (err) next(err);
    res.status(200).send(user);
  });
});

module.exports = router;


