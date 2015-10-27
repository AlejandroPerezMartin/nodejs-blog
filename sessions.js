'use strict';

var crypto = require('crypto');

var Sessions = function (db) {

    // Create an instance of the object if it is called without the 'new' operator
    if (false === (this instanceof Sessions)) {

        console.warn('Warning: Sessions object called without "new" operator');
        return new Sessions(db);

    }

    var sessions = db.collections('sessions');

    this.startSession = function (username, callback) {

        // Generate session id
        var currentDate = new Date().valueOf().toString();
        var random = Math.random().toString();
        var sessionID = crypto.createHash('sha1').update(currentDate + random).digest('hex');

        var session = {
            'username': username,
            '_id': sessionID
        };

        sessions.insert(session, function (err, result) {
            callback(err, sessionID);
        });

    };

    this.endSession = function (sessionID, callback) {
        sessions.remove({
            '_id': sessionID
        }, function (err, removed) {
            callback(err, removed);
        });
    };

    this.getUsername = function (sessionID, callback) {

        if (!sessionID) {
            callback(new Error('Session is not set'), null);
            return;
        }

        sessions.findOne({
            '_id': sessionID
        }, function (err, session) {

            if (err) return callback(err, null);

            if (!session) {
                callback(new Error('Session ' + session + ' does not exist'), null);
                return;
            }

            callback(null, session.username);
        });
    };

};

module.exports = Sessions;
