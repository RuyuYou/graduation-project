const login = require('./routers/login');
const users = require('./routers/users');
const tickers = require('./routers/tickers');
const trains = require('./routers/trains');
const report = require('./routers/report');
const station = require('./routers/stations');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/users', users);
  app.use('/tickers', tickers);
  app.use('/trains', trains);
  app.use('/report', report);
  app.use('/station', station);
};