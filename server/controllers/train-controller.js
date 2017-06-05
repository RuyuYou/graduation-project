const Train = require('../models/train');
const Tickers = require('../models/ticker');

const constant = require('../../config/constant');

class TrainController {
  getAll(req, res, next) {
    Train.find({}, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const trainId = req.params.trainId;
    Train.findOne({trainId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      res.clearCookie('trainId');
      res.cookie('trainId', trainId);
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  create(req, res, next) {
    Train.findOne({trainId: req.body.trainId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      if (!result) {
        const trainInformation = Object.assign(req.body, {createPeople: req.cookies.userName});
        Train.create(trainInformation, (err, result)=> {
          if (err) {
            return next(err);
          }
          return res.sendStatus(constant.httpCode.CREATED);
        });
      }
    });
  }

  delete(req, res, next) {
    const trainId = req.params.trainId;
    Train.findOneAndRemove({trainId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  update(req, res, next) {
    const trainId = req.params.trainId;
    const trainInformation = Object.assign(req.body, {createPeople: req.cookies.userName});
    Train.findOneAndUpdate({trainId}, trainInformation, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}

module.exports = TrainController;