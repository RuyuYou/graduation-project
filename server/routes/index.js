const login = require('./routers/login');
const users = require('./routers/users');
const tickers = require('./routers/tickers');
const consumers = require('./routers/consumers');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/users', users);
  app.use('/tickers', tickers);
  app.use('/consumers', consumers);
};