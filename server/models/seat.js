const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  trainId: String,
  position: String,
  price: Number,
  createPeople: String
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;