var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  users: [String],
  name: {
    type: String,
    required: true,
    unique: true
  }
});

exports.Category = mongoose.model('Category', schema);
