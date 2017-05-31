const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const K84Schema = new Schema({
  number: Number,
  name: String,
  endTime: {
    hour: String,
    minute: String
  },
  leaveTime: {
    hour: String,
    minute: String
  },
  days: String,
  parkTime: String,
  lastedTime: {
    hour: String,
    minute: String
  },
  mile: Number,
  seat: Number,
  soft: {
    up: Number,
    middle: Number,
    down: Number
  },
  hard: {
    up: Number,
    middle: Number,
    down: Number
  }
});

const K84 = mongoose.model('K84', K84Schema);

module.exports = K84;