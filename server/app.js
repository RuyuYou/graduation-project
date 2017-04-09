const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const config = require('config');
const router = require('./routes');
const bodyParser = require('body-parser');

mongoose.connect(config.get('mongoUri'));

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

router(app);

app.use('*', (req, res)=> {
  res.sendFile(path.resolve('./public/index.html'));
});

console.log(config.get('mongoUri'));

app.listen(config.get('httpPort'), ()=> {
  console.log('server started at http://localhost:' + config.get('httpPort'));
});