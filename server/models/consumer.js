const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumerSchema = new Schema({
  userName: String,
  mobilePhone: String,
  email: String,
  password: String
});

const Consumer = mongoose.model('Consumer', consumerSchema);

module.exports = Consumer;