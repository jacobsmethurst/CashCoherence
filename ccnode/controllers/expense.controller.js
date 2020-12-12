const expenseService = require('../services/expense.service');

module.exports = {
    create
};

function create(req, res, next) {
    expenseService.create(req)
        .then(expense => res.json(expense))
        .catch(err => next(err));
}