const savingService = require('../services/saving.service');

module.exports = {
    create,
    deleteSaving
};

function create(req, res, next) {
    savingService.create(req)
        .then(income => res.json(income))
        .catch(err => next(err));
}

function deleteSaving(req, res, next) {
    savingService.deleteSaving(req)
        .then(() => res.json())
        .catch(err => next(err));
}
