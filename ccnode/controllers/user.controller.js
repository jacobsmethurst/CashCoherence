const userService = require('../services/user.service');

module.exports = {
    authenticate,
    register
};

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect.' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}