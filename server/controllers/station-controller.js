const Station = require('../models/station');

const constant = require('../../config/constant');

class StationController {
  getAllStation(req, res, next) {
    Station.find({}, (err, result)=> {
      if (err) {
        return next(err);
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
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  createStation(req, res, next) {
    const stationInformation = Object.assign(req.body, {createPeople: req.cookies.userName});
    Station.create(stationInformation, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.CREATED);
    });
  }

  deleteStation(req, res, next) {
    const stationId = req.params.stationId;
    Station.findByIdAndRemove(stationId, (err, result)=> {
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
    const stationId = req.params.stationId;
    Station.findByIdAndUpdate(stationId, req.body, (err, result)=> {
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