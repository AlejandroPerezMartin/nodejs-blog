'use strict';

var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {

    if (req.accepts('html')) {
        return res.send('<h2>We could not find that page</h2>')
    }

    if (req.accepts('json')){
        return res.send({ error: 'Not found'});
    }

    res.status(404).send('We could not find that page :(');
});

router.use(function (req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;
