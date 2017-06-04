const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  trainId: String,
  tickers: Array
});

const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = Ticker;