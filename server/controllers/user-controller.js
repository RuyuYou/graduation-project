const Users = require('../models/user');

const constant = require('../../config/constant');

class LoginController {
  login(req, res) {
    const email = req.body.account;
    const password = req.body.password;
    Users.findOne({email, password}, (err, doc)=> {
      if (err) {
        throw err;
      }
      console.log(doc)
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.OK).send(doc);
    });
  }

  create(req, res) {
    Users.create(req.body, (err, doc)=> {
      if (err) {
        throw err;
      }
      return res.sendStatus(constant.httpCode.CREATED);
    });
  }
}

module.exports = LoginController;