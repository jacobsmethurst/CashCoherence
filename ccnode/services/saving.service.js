const config = require('../config.json');
const db = require('../_helpers/database');
const Saving = db.Saving;
const User = db.User;
const SavingGoal = db.SavingGoal;

module.exports = {
    create,
    deleteSaving
};

async function create(req) {
    if (!req.user.sub) {
        throw 'Malformed request, does not contain the appropriate user information';
    }

    const body = req.body;
    console.log(body);
    body.date = new Date(body.date);
    const user = req.user.sub;
    body.user = user;
    const saving = new Saving(body);

    const userObj = await User.findOne({_id: req.user.sub});
    let savingsNew = userObj.savings;
    savingsNew.push(saving._id);

    const goalObj = await SavingGoal.findOne({_id: saving.goal});
    let balanceNew = goalObj.balance;
    balanceNew += saving.amount;

    await saving.save();
    await User.updateOne({'_id': req.user.sub}, {$set: {'savings': savingsNew}});
    await SavingGoal.updateOne({'_id': saving.goal}, {$set: {'balance': balanceNew}});
}

async function deleteSaving(req) {
    const savingObj = await Saving.findOne({_id: req.params.id});
    const goalObj = await SavingGoal.findOne({_id: savingObj.goal});
    const userObj = await User.findOne({_id: req.user.sub});
    let savingsNew = userObj.savings;
    savingsNew.splice(savingsNew.indexOf(savingObj._id), 1);
    let balanceNew = goalObj.balance - savingObj.amount;

    await Saving.deleteOne({'_id': req.params.id});
    await SavingGoal.updateOne({'_id': goalObj._id}, {$set: {'balance': balanceNew}});
    await User.updateOne({'_id': userObj._id}, {$set: {'savings': savingsNew}});
}

