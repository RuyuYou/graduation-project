const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainSchema = new Schema({
  trainId: String,
  startPlace: String,
  endPlace: String,
  middlePlace: Array,
  lastedTime: String,
  startTime: String
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;