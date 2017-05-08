const Train = require('../models/train');

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

  create(req, res, next) {
    console.log(req.body);
    Train.create(req.body, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.CREATED);
    })
  }
}

module.exports = TrainController;