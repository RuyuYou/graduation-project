const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  trainId: String,
  cabinNumber: Number,
  sleeperNumber: Number,
  seatNumber: Number
});

const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = Ticker;