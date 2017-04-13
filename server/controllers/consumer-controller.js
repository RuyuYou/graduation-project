const Consumer = require('../models/consumer');
const constant = require('../../config/constant');

class ConsumerController {
  getAll(req, res, next) {
    Consumer.find({}, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const consumerId = req.params.consumerId;
    Consumer.findById(consumerId, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }


}

module.exports = ConsumerController;