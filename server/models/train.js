const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainSchema = new Schema({
  trainId: String,
  startPlace: String,
  endPlace: String,
  middlePlace: Array,
  lastedTime: {
    hour: Number,
    minutes: Number
  },
  startTime: {
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minutes: Number
  }
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;