'use strict';

var express = require('express');
var errors = require('./errors');
var router = express.Router();

module.exports = function(app){

    router.get('/', function(req, res){
        res.render('home');
    });

    errors(app);

};
