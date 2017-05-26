const Seat = require('../models/seat');

const constant = require('../../config/constant');

class SeatController {
  getAll(req, res, next) {
    Seat.find({}, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    Seat.findById(req.params.seatId, (err, result)=> {
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
    Seat.create(req.body, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.CREATED);
    });
  }

  delete(req, res, next) {
    Seat.findByIdAndRemove(req.params.seatId, (err, result)=> {
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
    Seat.findByIdAndUpdate(req.params.seatId, req.body, (err, result)=> {
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

module.exports = SeatController;