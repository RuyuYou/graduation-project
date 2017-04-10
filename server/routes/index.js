const login = require('./routers/login');
const users = require('./routers/users');
const tickers = require('./routers/tickers');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/users', users);
  app.use('/tickers', tickers);
};