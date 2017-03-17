const mongoose = require('../libs/mongoose'),
      Schema = mongoose.Schema;

let schema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: "Any"
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
});

exports.Item = mongoose.model('TestItems', schema);