const expenseService = require('../services/expense.service');

module.exports = {
    create,
    deleteExpense
};

function create(req, res, next) {
    expenseService.create(req)
        .then(expense => res.json(expense))
        .catch(err => next(err));
}

function deleteExpense(req, res, next) {
    expenseService.deleteExpense(req)
        .then(() => res.json())
        .catch(err => next(err));
}
