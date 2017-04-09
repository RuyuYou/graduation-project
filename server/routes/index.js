const login = require('./routers/login');

module.exports = function (app) {
  app.use('/api/login', login);
};