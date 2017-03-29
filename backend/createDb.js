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
// var itemObj = {
//   name: 'AC/DC - Chervona Ruta',
//   fotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Acdc_logo_band.svg/220px-Acdc_logo_band.svg.png',
//   info: 'Very nice music'
// };

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
//     category: 'Music', //related ctegory name
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