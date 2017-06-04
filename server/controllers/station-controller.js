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

  createStation(req, res, next) {
    const trainId = req.params.trainId;
    Station.findOne({trainId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      console.log(req.body);
      const stations = result.stations;
      stations.push(req.body);
      console.log(stations);
      const object = Object.assign({trainId: result.trainId}, {stations: stations});
      Station.findOneAndUpdate({trainId}, object, (err, result)=> {
        if (err) {
          return next(err);
        }
        return res.sendStatus(constant.httpCode.CREATED);
      });
    });
  }
}

module.exports = StationController;