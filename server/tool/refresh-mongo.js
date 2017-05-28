const mogoose = require('mongoose');
const rawData = require('./fixture/raw-data');
const Ticker = require('../models/ticker');
const Train = require('../models/train');
const User = require('../models/user');
const Station = require('../models/station');
const Seat = require('../models/seat');
const Sleeper = require('../models/sleeper');

const modelMap = {
  Ticker,
  Train,
  // Station,
  // Seat,
  // Sleeper,
  User
};

let docs = Object.keys(rawData);

module.exports = function refresh(done) {

  Object.keys(rawData).forEach((v) => {
    console.log(v);
    modelMap[v].remove(() => {
      modelMap[v].create(rawData[v], () => {
        docs = docs.filter(doc => doc !== v);
        if (docs.length === 0) {
          done();
        }
      })
    });
  });

};