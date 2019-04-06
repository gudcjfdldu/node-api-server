var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

var wallet = require('./api/wallet/index.js');

var cors = require('cors');

if(process.env.NODE_ENV !== 'test'){
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send({status: 500, message: 'internal error', type: 'internal'});
});

app.use(cors());
app.use('/wallet', wallet);

module.exports = app;
