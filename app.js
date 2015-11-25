'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var jade = require('jade');
var routes = require('./routes');
var mongoose = require('mongoose');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

app.use(require('./routes/errors'));
app.use('/', routes);

app.listen(3000, function () {
    console.log("Server running on localhost:3000");
});

// mongoose.db = connect("mongodb://localhost", function(err){
//     if (err) throw err;
//
//     console.log("connected to Mongoose!");
//
//     mongoose.disconnect();
// });
