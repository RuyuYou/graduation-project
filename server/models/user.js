const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId:Number,
  userName: String,
  password: String,
  email: String,
  mobilePhone: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;