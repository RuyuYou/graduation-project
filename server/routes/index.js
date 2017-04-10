const login = require('./routers/login');
const users = require('./routers/users');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/users', users);
};