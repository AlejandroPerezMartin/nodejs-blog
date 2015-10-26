'use strict';

var SessionHandler = require('./session');
// var ContentHandler = require('./content');
// var ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var sessionHandler = new SessionHandler(db);
    // var contentHandler = new ContentHandler(db);

    // Check if user is logged in, checked before next routes
    app.use(sessionHandler.isLoggedIn);

    // Blog main page
    app.get('/', contentHandler.displayMainPage);

    // Blog main page filtered by tag
    app.get('/tag/:tag', contentHandler.displayMainPageByTag);

    // Single post actions
    app.get('/post/:permalink', contentHandler.displayPostByPermalink);
    app.get('/newcomment', contentHandler.handleNewComment);
    app.get('/post_no_found', contentHandler.displayPostNotFound);

    // New post
    app.get('/newpost', contentHandler.displayNewPostPage);
    app.post('/newpost', contentHandler.handleNewPost);

    // Login
    app.get('/login', sessionHandler.displayLoginPage);
    app.post('/login', sessionHandler.handleLoginRequest);

    // Signup
    app.get('/signup', sessionHandler.displaySignupPage);
    app.post('/signup', sessionHandler.handleSignupRequest);

    // Logout
    app.get('/logout', sessionHandler.displayLogoutPage);

    app.use(ErrorHandler);
};
