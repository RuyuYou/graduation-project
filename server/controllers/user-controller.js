const Users = require('../models/user');

const constant = require('../../config/constant');

class UserController {
  getName(req, res) {
    const userInfo = req.session;
    console.log(userInfo);
    Users.findOne(userInfo, (err, doc)=> {
      if (err) {
        throw err;
      }
      return res.status(constant.httpCode.OK).send(doc);
    });
  }
}

module.exports = UserController;