const incomeService = require('../services/income.service');

module.exports = {
    create
};

function create(req, res, next) {
    incomeService.create(req)
        .then(income => res.json(income))
        .catch(err => next(err));
}