const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  trainId: String,
  firstInformation: {
    firstSeat: Number,
    firstPrice: Number
  },
  secondInformation: {
    secondSeat: Number,
    secondPrice: Number
  },
  specialInformation: {
    specialSeat: Number,
    specialPrice: Number
  }
});

const Ticker = mongoose.model('Ticker', tickerSchema);

module.exports = Ticker;