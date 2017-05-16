const mogoose = require('mongoose');
const refreshMongo = require('./refresh-mongo');

mogoose.connect('mongodb://localhost/train', (err) => {
  if (err) {
    console.log('connect error');
  } else {
    console.log('connect success');
  }
});

refreshMongo(() => {
  process.exit(0);
});