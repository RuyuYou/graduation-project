const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainSchema = new Schema({
  trainId: String,
  startPlace: String,
  startTime: {
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minute: Number
  },
  endPlace: String,
  endTime: {
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minute: Number
  },
  createPeople: String
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;