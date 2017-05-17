const mogoose = require('mongoose');
const rawData = require('./fixture/raw-data');
const Admin = require('../models/admin');
const Ticker = require('../models/ticker');
const Train = require('../models/train');

const modelMap = {
  Admin,
  Ticker,
  Train
};

let docs = Object.keys(rawData);

// mogoose.connect('mongodb://localhost/supermarket');
module.exports = function refresh(done) {

  Object.keys(rawData).forEach((v) => {
    modelMap[v].remove(() => {
      modelMap[v].create(rawData[v], () => {
        docs = docs.filter(doc => doc !== v);
        if (docs.length === 0) {
          done();
          // console.log('refreshMongo success')
          // process.exit(0);
        }
      })
    });
  });

};