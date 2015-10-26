var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var jade = require('jade');
var routes = require('./routes');
var MongoClient = require('mongodb').MongoClient;

var app = express();

MongoClient.connect('mongodb://localhost:27017/blog', function (err, db) {
    'use strict';

    if (err) throw err;

    // Set
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // Use
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());

    routes(app, db);

    app.listen(3000, function () {
        console.log('Server running on: localhost:3000')
    });

});
