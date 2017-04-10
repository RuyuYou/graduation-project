const Tickers = require('../models/ticker');

const constant = require('../../config/constant');


function getTimes() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();
  return `${year}年${month + 1}月${day}日`;
}

class TickerController {
  getTickers(req, res) {
    Tickers.find({}, (err, result) => {
      if (err) {
        throw err;
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  createTickers(req, res) {
    const createDate = getTimes();
    const tickerInfo = Object.assign({}, req.body, {createDate});
    Tickers.create(tickerInfo, (err, result) => {
      if (err) {
        throw err;
      }
      return res.sendStatus(constant.httpCode.CREATED);
    });
  }

  updateTickers(req, res) {
    const createDate = getTimes();
    const tickerInfo = Object.assign({}, req.body, {createDate});
    Tickers.findByIdAndUpdate(req.params.id, tickerInfo, (err, result)=> {
      if (err) {
        throw err;
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.NO_CONTENT).send(result);
    });
  }
}

module.exports = TickerController;