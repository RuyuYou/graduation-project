const Station = require('../models/station');

const constant = require('../../config/constant');

class StationController {
  createStation(req, res, next) {
    // const stationInformation = Object.assign(req.body, {createPeople: req.cookies.userName});
    Station.create(req.body, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.CREATED);
    });
  }
}

module.exports = StationController;