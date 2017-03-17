const crypto = require('crypto'),
      mongoose = require('../libs/mongoose'),
      Schema = mongoose.Schema;

let schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'TestItems'
  }],
  categories: [{
    type: String
  }]
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

//in db will be saved salt and hashedPassword properties only
schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password); //result of encrypt function(security reason)
  })
  .get(function() { return this._plainPassword});

  schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
  }

exports.User = mongoose.model('TestUsers', schema);

