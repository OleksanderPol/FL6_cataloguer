const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');

// connecting to our BD
mongoose.connect('mongodb://qwerty:qwerty@tastbaar.mongo.xervo.io:27017/inidA8mi');

// fill data here
var UserSchema   = new mongoose.Schema({
    name: String
    // and so on
});

var User = mongoose.model('Bear', UserSchema);

router.get('/', (req, res) => {
  res.send('api works');
});
/*
	Here will be added methods for updating, deleting, getting users or 
	items, refering to requests from frontend
*/

// Get all users
router.get('/users', (req, res) => {
  User.find(function(err, bears) {
    if (err)
      res.status(500).send(err);
    res.status(200).json(bears);
  });

});

module.exports = router;