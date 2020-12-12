const savingService = require('../services/saving.service');

module.exports = {
    create
};

function create(req, res, next) {
    savingService.create(req)
        .then(income => res.json(income))
        .catch(err => next(err));
}