'use strict';

var Sessions = require('../sessions');

var SessionHandler = function (db) {

    var users = new Users(db);
    var sessions = new Sessions(db);

    this.isLoggedIn = function (req, res, next) {
        var sessionID = req.cookies.session;

        sessions.getUsername(session_id, function (err, username) {

            if (!err && username) {
                req.username = username;
            }

            return next();
        });
    };

    this.displayLoginPage = function (req, res) {
        return res.render('login', {
            'username': '',
            'password': '',
            'error': ''
        });
    };

    this.handleLoginRequest = function (req, res, next) {

        var username = req.body.username;
        var password = req.body.password;

        console.log('Login request from:' + username + ' with password: ' + password);

        users.validateLogin(username, password, function (err, user) {
            if (err) {
                if (err.user_not_exists) {
                    return res.render('login', {
                        'username': username,
                        'password': '',
                        'error': 'The user does not exist'
                    });
                } else if (err.invalid_password) {
                    return res.render('login', {
                        'username': username,
                        'password': '',
                        'error': 'Invalid password'
                    });
                } else {
                    return next(err);
                }
            }
        });
    };

}

module.exports = SessionHandler;
