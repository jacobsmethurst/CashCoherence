const config = require('../config.json');
const db = require('../_helpers/database');
const Income = db.Income;
const User = db.User;

module.exports = {
    create
};

async function create(req) {
    if (!req.user.sub) {
        throw 'Malformed request, does not contain the appropriate user information';
    }

    const body = req.body;
    body.date = new Date(body.date);
    const user = req.user.sub;
    body.user = user;
    const income = new Income(body);

    const userObj = await User.findOne({_id: req.user.sub});
    if (!userObj) {
        throw 'Invalid user information, create a new user.';
    }
    let incomesNew = userObj.incomes;
    incomesNew.push(income._id);

    await income.save();
    await User.updateOne({'_id': user}, {$set: {'incomes': incomesNew}});

}
