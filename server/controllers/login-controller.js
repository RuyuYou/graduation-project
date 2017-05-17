const Admin = require('../models/admin');

const constant = require('../../config/constant');

class LoginController {
  login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    Admin.findOne({email, password}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.cookie('user', '1111');
      res.cookie('password', '2222');
      return res.send({status: constant.httpCode.OK});
    });
  }

  getName(req, res) {
    const userInfo = req.session;
    Admin.findOne(userInfo, (err, doc)=> {
      if (err) {
        throw err;
      }
      return res.status(constant.httpCode.OK).send(doc);
    });
  }
}

module.exports = LoginController;