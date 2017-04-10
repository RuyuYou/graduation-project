const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  trainId: String,
  firstSeat: Number,
  secondSeat: Number,
  specialSeat: Number
});

const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = Ticker;