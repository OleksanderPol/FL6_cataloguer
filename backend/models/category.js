const mongoose = require('../libs/mongoose'),
      Schema = mongoose.Schema;

let schema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Misc"
  }
});

exports.Category = mongoose.model('TestCategory', schema);