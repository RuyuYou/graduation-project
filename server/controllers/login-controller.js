// const Admin = require('../models/admin');
const User = require('../models/user');

const constant = require('../../config/constant');

class LoginController {
  login(req, res, next) {
    const userId = req.body.userId;
    const password = req.body.password;
    User.findOne({userId, password}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
      res.clearCookie('userId');
      res.clearCookie('userName');
      res.clearCookie('password');
      res.clearCookie('email');
      res.clearCookie('mobilePhone');
      res.cookie('userId', result.userId);
      res.cookie('userName', result.userName);
      res.cookie('password', result.password);
      res.cookie('email', result.email);
      res.cookie('mobilePhone', result.mobilePhone);
      return res.sendStatus(constant.httpCode.OK);
    });
  }

  getName(req, res) {
    const userId = req.cookies.userId;
    User.findOne({userId}, (err, doc)=> {
      if (err) {
        throw err;
      }
      return res.status(constant.httpCode.OK).send(doc);
    });
  }
}

module.exports = LoginController;