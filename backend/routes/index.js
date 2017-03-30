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

router.get('/signout', function(req, res) {
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


router.put('/home/:user', function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    user.email = req.body.email;
    user.info = req.body.info;
    user.save(function(err) {
      if (err) {
        console.log(err);
        next(new HttpError(500));
      } else {
        console.log(user);
        res.send(user);
      }
    })
  })
})

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
        // category.amountOfItems = 0;
        itemCell.forEach((item)=>{
          if (item.category == category.name) {
            category.amountOfItems = item ? item.items.length : 0;
          } else {
            category.amountOfItems = 0;
          }
          })
        // category.amountOfItems = itemCell[index] ? itemCell[index].items.length : 0;
        return category;
      });

      res.json(result);
    });
  });
});

router.post('/categories', function(req, res, next) {
  var category = new Category({
    users: [req.user._id],
    name: req.body.name
    })
  category.save(function(err) {
    if (err) {
      return next(err);
    } else {
      return next(200);
    }
  })
});

router.delete('/categories/:category', function(req, res, next){
  Item.remove({owner: req.user._id, category: req.params.category},
              function(error, removed) {
                if (error) {
                  return next(error);
                } else {
                  console.log(removed);
                }
              });
  Category.findOne({name: req.params.category}, function(err, category) {
    var userIndex = category.users.indexOf(req.user._id);
    if (userIndex > -1) {
      category.users.splice(userIndex, 1);
      category.save(function(err) {
        if (err) {
          return next(err);
        } else {
          return next(200);
        }
      })
    } else {
      console.log("user in category not found");
      return next(500);
    }
  })
});

router.post('/:category/items', function(req, res, next) {

  Item.findOne({category: req.params.category}, function(err, item) {
    if(err) {
      return next(err);
    } else {
      item.items.push({
        name: req.body.name,
        fotoUrl: req.body.fotoUrl,
        info: req.body.info
      });
      item.save(function(err) {
        if (err) {
          return next(err);
        } else {
          return next(200);
        }
      })
    }
  })

});

router.get('/:category/items', function(req, res, next) {
  var categoryName = req.params.category;

  if (!req.user) {
    return next(401);
  }

  if (categoryName == "allcategories") {
    Item.find({owner: req.user._id}, function(err, items) {
      if (err) {
        return next(err);
      } else if (items == []) {
        res.json([]);
      } else {
        var userItems = items.reduce((first, second)=>{
          return first.concat(second.items);
        }, [])
        res.json(userItems)
      }
    })
  } else {

    Item.findOne({category: categoryName, owner: req.user._id}, function(err, itemCell) {
      if (err) {
        return next(err);
      } else if (itemCell == null) {
        res.json([]);
      } else {
        res.json(itemCell.items);
      }
    });
  }

});



router.get('/items/search/:search', function(req, res, next) {
  Item.find({"items.name": new RegExp(req.params.search, "i")}, function(err, items) {
    var result = [],
        template = new RegExp(req.params.search, "i");
    items.forEach(function(elem) {
      elem.items.forEach(function(item) {
        if (template.test(item.name)) result.push(item);
      })
    })
    res.json(result);
  })
})

router.get('/items/:id', function(req, res, next) {
  Item.findOne({"items._id": req.params.id}, function(err, item) {
    if (err) {
      return next(err);
    } else {
      User.findById(item.owner, function(err, user) {
        if (err) {
          return next(err);
        } else {
          res.json(user);
        }
      });
    }
  })
})

router.put('/items/:id', function(req, res, next) {
 Item.findOne({"items._id": req.params.id},
               function(err, item) {
   var searchedItem = item.items.find(function(elem) {
     return elem._id == req.params.id;
   })
   for(var prop in req.body) {
     searchedItem[prop] = req.body[prop];
   }
     item.save(function(err) {
     if (err) {
       next(err);
     } else {
       console.log('updated');
       return next(200);
     }
   });
 });
});

router.delete('/items/:id', function(req, res, next){
  Item.remove({"items._id": req.params.id},
              function(error, removed) {
                if (error) {
                  return next(error);
                } else {
                  console.log(removed);
                }
              });
})

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = router;


