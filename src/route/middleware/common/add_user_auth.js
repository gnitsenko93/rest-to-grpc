'use strict';

function addUserAuth(req, res, next) {
    const user = req.get('user');
    const password = req.get('password');

    req.userAuth = { user, password };

    return next();
}

module.exports = addUserAuth;
