const savinggoalService = require('../services/savinggoal.service');

module.exports = {
    create,
    addUser
};

function create(req, res, next) {
    savinggoalService.create(req)
        .then(income => res.json(income))
        .catch(err => next(err));
}

function addUser(req, res, next) {
    savinggoalService.addUser(req)
        .then(user => res.json())
        .catch(err => next(err));
}