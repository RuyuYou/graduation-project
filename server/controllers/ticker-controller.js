const Tickers = require('../models/ticker');
const Train = require('../models/train');

const constant = require('../../config/constant');

class TickerController {
  getTickers(req, res, next) {
    Tickers.find({}, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  createTickers(req, res, next) {
    Tickers.findOne({trainId: req.body.trainId}, (err, result)=> {
      if (result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      } else {
        Tickers.create(req.body, (err, result) => {
          if (err) {
            return next(err);
          }
          return res.sendStatus(constant.httpCode.CREATED);
        });
      }
    });
  }

  deleteTickers(req, res, next) {
    const tickerId = req.params.tickerId;
    Tickers.findByIdAndRemove(tickerId, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  updateTickers(req, res, next) {
    Train.findOne({trainId: req.body.trainId}, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.ACCEPTED);
      }
      if (doc) {
        Tickers.findOne({trainId: req.body.trainId}, (err, result)=> {
          if (result) {
            return res.sendStatus(constant.httpCode.NO_CONTENT);
          } else {
            Tickers.findByIdAndUpdate(req.params.tickerId, req.body, (err, result)=> {
              if (err) {
                return next(err);
              }
              if (!result) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
              }
              return res.status(constant.httpCode.OK).send(result);
            });
          }
        });
      }
    })
  }
}

module.exports = TickerController;