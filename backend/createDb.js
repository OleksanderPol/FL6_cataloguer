let User = require('models/user').User;

User.findOne({username: 'Alex'}, function(err, user) {
  console.log(user);
});
