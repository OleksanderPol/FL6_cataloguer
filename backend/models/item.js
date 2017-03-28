var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  owner: {
    type: String,
    required: true,
    default: "some man"
  },
  category: {
    type: String,
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    fotoUrl: {
      type: String
    },
    info: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now
    },
    rating: {
      type: Number,
      default: 0
    },
    borrowedTo: {
      type: String
    }
  }]
});

exports.Item = mongoose.model('TestItems', schema);
