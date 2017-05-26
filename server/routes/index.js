const login = require('./routers/login');
const users = require('./routers/users');
const tickers = require('./routers/tickers');
const trains = require('./routers/trains');
const report = require('./routers/report');
const stations = require('./routers/stations');
const seats = require('./routers/seats');
const sleepers = require('./routers/sleepers');

module.exports = function (app) {
  app.use('/login', login);
  app.use('/users', users);
  app.use('/tickers', tickers);
  app.use('/trains', trains);
  app.use('/report', report);
  app.use('/stations', stations);
  app.use('/seats', seats);
  app.use('/sleepers', sleepers);
};