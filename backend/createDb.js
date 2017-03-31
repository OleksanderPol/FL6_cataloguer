var User = require('./models/user').User,
    Item = require('./models/item').Item,
    Category = require('./models/category').Category;

// var DEFAULT_CATEG = ['Music', 'Books', 'Games', 'Bikes', 'Coins', 'Marks', 'Films', 'Plants'],
//     testUser = {
//       username: 'Frodo',
//       email: 'frodo@gmail.com',
//       password: '12345678',
//       photoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4e/Elijah_Wood_as_Frodo_Baggins.png',
//       info: 'Very good hobbit'
//     };

// //we need every time when we add new item for user/
var itemObj = {
  name: 'Harry potter 4',
  fotoUrl: 'http://schmoesknow.com/wp-content/uploads/2017/03/Avatar.jpg',
  info: 'Very nice book',
  reting: 4
};

// function createUser(userObj) {
//   var user = new User(userObj);

//   user.save(function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('user created: ' + userObj.username);
//     }
//   })
// }

// function createCategories(query) {
//   User.findOne(query, function(err, user) {
//     if (err) {
//       console.log(err);
//     }

//     DEFAULT_CATEG.forEach(function(categName) {
//       var category = new Category({
//         users: [user._id],
//         name: categName
//       });

//       category.save(function(err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('New categories created')
//         }
//       });
//     });
//   });
// }

// function showDocument(model, query) {
//   model.find(query, function(err, category) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(category);
//   });
// }

// // ***How to remove a collection
// function removeDocument(model) {
//   model.remove({}, function(err) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('deleted');
//     }
//   });
// }

// function createTestItem(itemObj) {
//   var userItems = [];
//   userItems.push(itemObj);

//   var item = new Item({
//     owner: '58d81859a0b90913b059d75c', //our users id
//     category: 'Books', //related ctegory name
//     items: userItems //our first item in category
//   });

//   item.save(function(err) {
//     if (err) console.log(err);
//     console.log('Items cell crearted');
//   });
// }

// function addItem(itemObj, query ) {
//   Item.findOneAndUpdate(query,
//     {$push: {'items': itemObj}},
//     function(err, model) {
//       if (err) console.log(err);

//       console.log('New item added to model');
//     });
// }

// function demo() {
//   createUser(testUser);
//   createCategories({username: 'Frodo'});
//   showDocument(category, {users: '58d81859a0b90913b059d75c'});
//   createTestItem(itemObj);
//   addItem(itemObj);
//   addItem(itemObj);
//   showDocument(Item, {owner: '58d81859a0b90913b059d75c'});
// }

// showDocument(Item, {owner: '58d81859a0b90913b059d75c'});

// Item.findOne({"items._id": '58dad53b623d5e30d886cb08'}, function(err, items) {
//     console.log(items.owner);
//   })
// Item.findOne({"items._id": '58dad53b623d5e30d886cb08'}, function(err, item) {
//     if (err) {
//       console.log(err);
//     } else {
//       User.findById(item.owner, function(err, user) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(user);
//         }
//       });
//     }
//   })

// addItem(itemObj, {$and: [{owner: '58d81859a0b90913b059d75c'}, {category: 'Books'}]});
// createTestItem(itemObj);
// var music = new Item({
//   owner: '58d81859a0b90913b059d75c',
//   category: 'Music',
//   items: [{
//     name: "Nothing else matters",
//     info: "Good music",
//     rating: 5,
//     fotoUrl: "http://mycoverpoint.com/wp-content/uploads/Nothing-Else-Matters-Facebook-Cover.png"
//   }]
// })

// music.save(err=>{
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('success');
//   }
// })

// Category.remove({name: "Bikes1"}, (err, removed)=>{
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(removed);
//   }
// })

// Category.find({}, (err, items)=>{
//   console.log(items)
// })


var item = new Category({
  // owner: '58de232f740eb9126f7c93ac',
  // category: 'COINS',
  // items: [{
  //   name: "coin"
  // }]
  name: "COINS",
  users: ['58de232f740eb9126f7c93ac']
})

item.save(err=>{
  if (err) {
    console.log(err);
  } else {
    console.log(item);
  }
})

// Item.findById('58de20dd2b771610b1163ad9', (err, item)=>{
//   if (err) {
//     console.log(err);
//   } else if (item) {
//     item.items.push({
//       name: "Ponyashka",
//       info: 'My pony',
//       rating: 5
//     });
//     item.save(err=>{
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(item);
//       }
//     })
//   } else {
//     console.log("jopa");
//   }
// })
