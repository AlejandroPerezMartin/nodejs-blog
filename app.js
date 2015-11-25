'use strict';

var express = require('express');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var jade = require('jade');

require('express-mongoose');

var routes = require('./routes');
var middlewares = require('./middlewares');

mongoose.set('debug', true);
mongoose.connect("mongodb://localhost/blog", function (err) {

    if (err) throw err;

    var app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use('/static', express.static(__dirname + '/public'));
    app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

    middlewares(app);
    routes(app);

    app.listen(3000, function () {
        console.log("Server running on localhost:3000");
    });

});
