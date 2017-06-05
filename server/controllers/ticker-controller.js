const Tickers = require('../models/ticker');

const constant = require('../../config/constant');

class TickerController {
  getOneTrain(req, res, next) {
    const trainId = req.params.trainId;
    Tickers.findOne({trainId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOneStation(req, res, next) {
    const trainId = req.params.trainId;
    const number = req.params.number;
    Tickers.findOne({trainId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      const ticker = result.tickers.find((item, index)=> {
        return item.number == number;
      });
      if (ticker) {
        return res.status(constant.httpCode.OK).send(ticker);
      } else {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
    });
  }
}

module.exports = TickerController;