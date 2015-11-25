'use strict';

module.exports = function(app){

    app.use(function (req, res) {

        if (req.accepts('html')) {
            return res.send('<h2>We could not find that page</h2>')
        }

        if (req.accepts('json')){
            return res.send({ error: 'Not found'});
        }

        res.status(404).send('We could not find that page :(');
    });

    app.use(function (req, res) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

};
