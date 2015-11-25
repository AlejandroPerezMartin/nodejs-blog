var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function (app) {
    app.use(express.logger('dev'));

    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'building a blog'
    }));
    app.use(express.bodyParser());

    app.use(function (req, res, next) {
        res.locals.session = req.session;
        next();
    })
}
