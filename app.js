'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var jade = require('jade');
var routes = require('./routes');
var mongoose = require('mongoose');

var app = express();
