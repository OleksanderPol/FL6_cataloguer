const mongoose = require('../libs/mongoose'),
      Schema = mongoose.Schema;

let schema = new Schema({
	categories: [{
  	name: {
  	  type: String,
  	  required: true,
  	  default: "Misc"
  	},
  	items: [{
    	type: Schema.Types.ObjectId,
    	ref: 'TestItems'
  	}]
  }]
});

exports.Category = mongoose.model('TestCategory', schema);