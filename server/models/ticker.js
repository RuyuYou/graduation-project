const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  trainId: String,
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

const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = Ticker;