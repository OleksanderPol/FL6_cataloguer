const mongoose = require('../libs/mongoose'),
      Schema = mongoose.Schema;

let schema = new Schema({
  items: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'TestCategory'
    },
    photoUrl: {
      type: String,
      default: "../../src/favicon.ico"
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'TestUsers'
    },
    created: {
      type: Date,
      default: Date.now
    }
  }]
});

exports.Item = mongoose.model('TestItems', schema);