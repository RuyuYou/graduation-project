const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sleeperSchema = new Schema({
  trainId: String,
  type: String,
  position: String,
  price: Number,
  createPeople: String
});

const Sleeper = mongoose.model('Sleeper', sleeperSchema);

module.exports = Sleeper;