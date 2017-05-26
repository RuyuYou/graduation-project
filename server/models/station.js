const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  trainId: String,
  stations: Array,
  createPeople: String
});

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;