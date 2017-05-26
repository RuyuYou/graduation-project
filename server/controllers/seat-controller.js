const Seat = require('../models/seat');

const constant = require('../../config/constant');

class SeatController {
  create(req, res, next) {
    Seat.create(req.body, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.CREATED);
    });
  }
}

module.exports = SeatController;