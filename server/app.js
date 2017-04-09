const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const config = require('config');
const captcha = require('../config/captcha');

mongoose.connect(config.get('mongoUri'));

const app = express();

app.use(express.static('public'));


app.use('*', (req, res)=> {
  res.sendFile(path.resolve('./public/index.html'));
});

var params = {
  'url': '/captcha.jpg',
  'color': '#ffffff',
  'background': '#000000',
  'lineWidth': 1,
  'fontSize': 25,
  'codeLength': 4,
  'canvasWidth': 72,
  'canvasHeight': 34
};
app.use(captcha(params));

app.listen(config.get('httpPort'), ()=> {
  console.log('server started at http://localhost:' + config.get('httpPort'));
});