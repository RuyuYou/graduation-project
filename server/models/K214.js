const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const K214Schema = new Schema({
  number: Number,
  name: String,
  endTime: {
    hour: String,
    minute: String
  },
  leaveTime: {
    hour: String,
    minute: String,
    days: String
  },
  parkTime: String,
  lastedTime: {
    hour: String,
    minute: String
  },
  mile: Number
});

const K214 = mongoose.model('K214', K214Schema);

module.exports = K214;