const incomeService = require('../services/income.service');

module.exports = {
    create,
    deleteIncome
};

function create(req, res, next) {
    incomeService.create(req)
        .then(income => res.json(income))
        .catch(err => next(err));
}

function deleteIncome(req, res, next) {
    incomeService.deleteIncome(req)
        .then(() => res.json())
        .catch(err => next(err));
}
