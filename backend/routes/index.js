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

  User.findOne({username: username}, function(err, oldUser) {
    if (err) return next(err);

    if (oldUser) {
      return next(new HttpError(403, 'Such user exist'));
    } else {
      var user = new User ({
        username: username,
        password: password,
        email: email,
        photoUrl: '/assets/img/mock.jpg'
      });

      user.save(function(err) {
        if (err) return next(err);
        else {
          req.session.user = user._id;
          console.log('new user creater: ' + username);
          res.send(user);
        }
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

router.post('/signout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

router.get('/home/:user', function(req, res) {
  // if (req.user.username === req.params.user) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  // } else {
  //   res.redirect('/');
  // }
});

router.put('/home/:user', function(req, res, next) {
  User.findOne({ username: req.params.user }, function(err, user) {
    for (var key in req.body) {
      user[key] = req.body[key];
    }
    user.save(function(err) {
      if (err) {
        // console.log(err);
        next(new HttpError(500, err));
      } else {
        // console.log(user);
        res.send(user);
      }
    })
  })
})

router.get('/allcategories', function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) {
      return next(err);
    } else {
      res.json(categories);
    }
  })
})

router.get('/users/:category', function(req, res, next) {
  Category.findOne({name: req.params.category}, function(err, category) {
    if (err) {
      return next(err);
    } else if (category == null) {
      res.status(404).send([]);
    } else if (category.users == []) {
      res.json([]);
    } else {
      User.find({ "_id": { "$in": category.users }}, function(err, users) {
        if (err) {
          return next(err);
        } else {
          res.json(users);
        }
      });
    }
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
        category.amountOfItems = 0;
        itemCell.forEach((item)=>{
          if (item && item.category == category.name) {
            category.amountOfItems = item.items.length;
          }
        })
        return category;
      });

      res.json(result);
    });
  });
});

router.post('/categories', function(req, res, next) {
  Category.findOne({name: req.body.name}, function(err, category) {
    if (err) {
      return next(err);
    } else if (category) {
      category.users.push(req.user._id);
      category.save(function(err) {
        if (err) {
          return next(err);
        } else {
          res.status(200).send("Welcome to existing category");
        }
      })
    } else {
      var category = new Category({
        users: [req.user._id],
        name: req.body.name
      });
      category.save(function(err) {
        if (err) {
          return next(err);
        } else {
          res.status(200).send("Congratulations! You are a pioneer in this field!");
        }
      })
    }
  })
});

router.delete('/categories/:category', function(req, res, next){
  Item.remove({owner: req.user._id, category: req.params.category},
              function(error, removed) {
                if (error) {
                  return next(error);
                } else {
                  console.log(req.params.category + ' deleted');
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
      return next(404);
    }
  })
});

router.post('/:category/items', function(req, res, next) {
  var query = {$and: [{owner: req.user._id}, {category: req.params.category}]},
      itemObj = {
        name: req.body.name,
        fotoUrl: req.body.fotoUrl,
        info: req.body.info
      };

  Item.findOne(query, function(err, item) {
    if (err) return next(err);

    if (item == null) {
      var newItemCell = new Item({
        category: req.params.category,
        owner: req.user._id,
        items: [itemObj]
      });

      newItemCell.save(function(err) {
        if (err) return next(err);
        res.send('New item saved');
      });
    } else {
      Item.findOneAndUpdate(query,
        {$push: {'items': itemObj}},
        function(err, model) {
          if (err) return next(err);
          res.send('New item saved');
        });
    }
  });
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

    Item.findOne({category: categoryName, owner: req.user._id},
                  function(err, itemCell) {
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
  Item.find({"items.name": new RegExp(req.params.search, "i")},
            function(err, items) {
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

router.delete('/items/:id', function(req, res, next) {
  Item.findOne({"items._id": req.params.id},
                function(error, item) {
    if (error) {
      return next(error);
    } else {
      var itemIndex = item.items.findIndex(function(elem) {
        return elem._id == req.params.id;
      })
      item.items.splice(itemIndex, 1);
      item.save(function(err) {
        if (err) {
          return next(err);
        } else {
          return next(200);
        }
      })
    }
  });
})

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = router;
