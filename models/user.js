var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validEmail = require('../helpers/validate/email');

var userSchema = new Schema({
    _id: {
        type: String
    },
    name: {
        first: String,
        last: String
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = userSchema;
