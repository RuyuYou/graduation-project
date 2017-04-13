const Users = require('../models/user');

const constant = require('../../config/constant');

class LoginController {
  login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    Users.findOne({email, password}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.OK);
    });
  }
}

module.exports = LoginController;