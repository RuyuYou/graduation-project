const Station = require('../models/station');

const constant = require('../../config/constant');

class StationController {
  findNumber(req, res, next) {
    const trainId = req.cookies.trainId;
    const number = req.params.number;
    const TrainId = require(`../models/${trainId}`);
    TrainId.findOne({number}, (err, result)=> {
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
    const TrainId = require(`../models/${req.params.trainId}`);
    TrainId.find({}, (err, result)=> {
      if (err) {
        return next(err);
      }
      res.clearCookie('trainId', trainId);
      res.cookie('trainId', trainId);
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getStationNumber(req, res, next) {
    const trainId = req.params.trainId;
    const number = req.params.number;
    const TrainId = require(`../models/${req.params.trainId}`);
    TrainId.findOne({number: number}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  createStation(req, res, next) {
    const trainId = req.params.trainId;
    const TrainId = require(`../models/${req.params.trainId}`);
    TrainId.create(req.body, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.CREATED);
    });
  }

  deleteStation(req, res, next) {
    const number = req.params.stationId;
    const trainId = req.params.trainId;
    const TrainId = require(`../models/${req.params.trainId}`);
    TrainId.findOneAndRemove({number}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      return res.sendStatus(constant.httpCode.OK);
    });
  }

  updateStation(req, res, next) {
    const trainId = req.params.trainId;
    const number = req.params.number;
    const TrainId = require(`../models/${req.params.trainId}`);
    TrainId.findOneAndUpdate({number}, req.body, (err, result)=> {
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

module.exports = StationController;