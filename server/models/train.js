const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainSchema = new Schema({
  trainId: String,
  type: String,
  startPlace: String,
  endPlace: String,
  startTime: {
    hour: String,
    minute: String
  },
  endTime: {
    days: String,
    hour: String,
    minute: String
  },
  lastedTime: {
    hour: String,
    minute: String
  },
  mile: Number,
  createPeople: String
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;