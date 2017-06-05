const Station = require('../models/station');
const Train = require('../models/train');

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
      const station = result.stations.find((item, index)=> {
        return item.number == number
      });
      if (station) {
        return res.status(constant.httpCode.OK).send(station);
      } else {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
    });
  }

  createStation(req, res, next) {
    const trainId = req.params.trainId;
    Train.findOne({trainId}, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      if (doc) {
        Station.findOne({trainId}, (err, result)=> {
          if (err) {
            return next(err);
          }
          if (!result) {
            const stations = [];
            stations.push(req.body);
            const object = Object.assign({trainId}, {stations: stations});
            Station.create(object, (err, result)=> {
              if (err) {
                return next(err);
              }
              return res.sendStatus(constant.httpCode.CREATED);
            });
          }
          if (result) {
            const stations = result.stations;
            stations.push(req.body);
            const object = Object.assign({trainId}, {stations: stations});
            Station.findOneAndUpdate({trainId}, object, (err, result)=> {
              if (err) {
                return next(err);
              }
              return res.sendStatus(constant.httpCode.CREATED);
            });
          }
        });
      }
    })
  }

  deleteOneStation(req, res, next) {
    const trainId = req.params.trainId;
    Station.findOne({trainId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      const stations = result.stations;
      stations.map((item, index)=> {
        if (item.number == req.params.number) {
          stations.splice(index, 1);
        }
      });
      const object = Object.assign({trainId: result.trainId}, {stations: stations});
      Station.findOneAndUpdate({trainId}, object, (err, result)=> {
        if (err) {
          return next(err);
        }
        return res.sendStatus(constant.httpCode.OK);
      });
    });
  }

  updateOneStation(req, res, next) {
    const trainId = req.params.trainId;
    Station.findOne({trainId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      const stations = result.stations;
      stations.map((item, index)=> {
        if (item.number == req.params.number) {
          stations.splice(index, 1, req.body);
        }
      });
      const object = Object.assign({trainId: result.trainId}, {stations: stations});
      Station.findOneAndUpdate({trainId}, object, (err, result)=> {
        if (err) {
          return next(err);
        }
        return res.sendStatus(constant.httpCode.OK);
      });

    });
  }
}

module.exports = StationController;