let User = require('./models/user').User;
let Item = require('./models/item').Item;
let Category = require('./models/category').Category;

User.findOne({username:"Max"}, (err, user)=>{
	user.items = [];
	Item.findOne({name:"Lord Of the Rings"}, (err, item)=>{
		user.items.push(item._id);
		item.author = user._id;
		console.log("==================\n" + user.items + "\n===================");
	});
})

setTimeout(()=>{
	User.find(function(err, users) {
	 	console.log(users);
	});

	console.log("=================================")

	Item.find(function(err, items) {
		console.log(items);
	});
}, 2000);