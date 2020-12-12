const userService = require('../services/user.service');

module.exports = {
    authenticate,
    register,
    getById
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

function getById(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Could not find user information' }))
        .catch(err => next(err));
    }
