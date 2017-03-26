let User = require('./models/user').User;
let Item = require('./models/item').Item;
let Category = require('./models/category').Category;

// User.findOne({username:"Max"}, (err, user)=>{
// 	user.items = [];
// 	Item.findOne({name:"Lord Of the Rings"}, (err, item)=>{
// 		user.items.push(item._id);
// 		item.author = user._id;
// 		console.log("==================\n" + user.items + "\n===================");
// 	});
// })

// setTimeout(()=>{
// 	User.find(function(err, users) {
// 	 	console.log(users);
// 	});

// 	console.log("=================================")

// 	Item.find(function(err, items) {
// 		console.log(items);
// 	});
// }, 2000);

// const DEFAULT_CATEG = ['Music', 'Books', 'Games', 'Bikes', 'Coins', 'Marks', 'Films', 'Plants'];


// User.findOne({username: 'Frodo'}, function(err, user) {
//   if (err) {
//     console.log(err);
//   }

//   DEFAULT_CATEG.forEach(function(categName) {
//     let category = new Category({
//       users: [user._id],
//       name: categName
//     });

//     category.save(function(err) {
//       if (err) console.log(err);
//     });
//   });
// });


// Category.find({'users': '58d78b09091b8605906eb327'}, function(err, category) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(category);
// });

// // ***How to remove a collection
// Category.remove({}, function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('deleted');
//   }
// });

//we need every time when we add new item for user/
let itemObj = {
  name: 'AC/DC - Rock or Bust',
  fotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Acdc_logo_band.svg/220px-Acdc_logo_band.svg.png',
  info: 'Very nice music'
}

//we need when we firstly create item in some catalog
let itemCell = {
  owner: '58d78b09091b8605906eb327',
  category: 'Music',
  items: []
}

function createTestItem(itemObj, userItemSell) {
  let userItems = [];

  userItems.push(itemObj);

  let item = new Item(userItemSell);

  item.save(function(err) {
    if (err) console.log(err);
    console.log('New item added');
  });
}

function addItem(itemObj, query ) {
  Item.findOneAndUpdate(query,
    {$push: {'items': itemObj}},
    function(err, model) {
      if (err) console.log(err);

      console.log('New item added to model');
    });
}

addItem(itemObj, {owner: '58d78b09091b8605906eb327'});


Item.find({}, function(err, item) {
  console.log(item[0].items);
});
