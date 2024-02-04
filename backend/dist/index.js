"use strict";

var express = require('express');
var app = express();
var port = 3000;
var users = require('./routes/users');
var weddingSalons = require('./routes/weddingSalons');
var reservationRoutes = require('./routes/reservation');
var tables = require('./routes/tables');
var seats = require('./routes/seats');
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  res.json({
    message: 'ok'
  });
});
app.use('/users', users);
app.use('/svadbeniSaloni', weddingSalons);
app.use('/rezervacije', reservationRoutes);
app.use('/stolovi', tables);
app.use('/stolice', seats);
app.use(function (err, req, res, next) {
  var statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({
    message: err.message
  });
  return;
});
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});