const Station = require('../models/station');

const constant = require('../../config/constant');

class StationController {
  getTrainStation(req, res, next) {
    const trainId = req.params.trainId;
    Station.findOne({trainId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      res.clearCookie('trainId');
      res.cookie('trainId', result.trainId);
      return res.status(constant.httpCode.OK).send(result.stations);
    });
  }

  getOneStation(req, res, next) {
    const trainId = req.cookies.trainId;
    const number = req.params.number;
    Station.findOne({trainId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      result.stations.map((item, index)=> {
        if (item.number == number) {
          return res.status(constant.httpCode.OK).send(item);
        }
      });
    });
  }
}

module.exports = StationController;