const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  trainId: String,
  startPlace: String,
  endPlace: String,
  lasted: String,
  hardSeat: Number,
  softSeat: Number,
  createDate: String
});

const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = Ticker;