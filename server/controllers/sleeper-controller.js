const Sleeper = require('../models/sleeper');

const constant = require('../../config/constant');

class SleeperController {
  getAll(req, res, next) {
    Sleeper.find({}, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    Sleeper.findById(req.params.sleeperId, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  create(req, res, next) {
    const seatInformation = Object.assign(req.body, {createPeople: req.cookies.userName});
    Sleeper.create(seatInformation, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.CREATED);
    });
  }

  delete(req, res, next) {
    Sleeper.findByIdAndRemove(req.params.sleeperId, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      return res.sendStatus(constant.httpCode.OK);
    });
  }

  update(req, res, next) {
    Sleeper.findByIdAndUpdate(req.params.sleeperId, req.body, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      return res.sendStatus(constant.httpCode.OK);
    });
  }
}

module.exports = SleeperController;