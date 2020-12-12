const config = require('../config.json');
const db = require('../_helpers/database');
const Expense = db.Expense;
const User = db.User;

module.exports = {
    create,
    deleteExpense
};

async function create(req) {
    if (!req.user.sub) {
        throw 'Malformed request, does not contain the appropriate user information';
    }

    const body = req.body;
    body.date = new Date(body.date);
    const user = req.user.sub;
    body.user = user;
    const expense = new Expense(body);

    const userObj = await User.findOne({_id: req.user.sub});
    if (!userObj) {
        throw 'Invalid user information, create a new user.';
    }
    let expensesNew = userObj.expenses;
    expensesNew.push(expense._id);

    await expense.save();
    await User.updateOne({'_id': user}, {$set: {'expenses': expensesNew}});

}

async function deleteExpense(req) {
    const userObj = await User.findOne({_id: req.user.sub});
    let expensesNew = userObj.expenses;
    expensesNew.splice(expensesNew.indexOf(req.params.id), 1);

    await Expense.deleteOne({'_id': req.params.id});
    await User.updateOne({'_id': userObj._id}, {$set: {'expenses': expensesNew}});
}
