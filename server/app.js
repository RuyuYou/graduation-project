const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const config = require('config');

mongoose.connect(config.get('mongoUri'));

const app = express();

app.use(express.static('public'));


app.use('*', (req, res)=> {
  res.sendFile(path.resolve('./public/index.html'));

});

app.listen(config.get('httpPort'), ()=> {
  console.log('server started at http://localhost:' + config.get('httpPort'));
});