const config = require('../config.json');
const db = require('../_helpers/database');
const SavingGoal = db.SavingGoal;
const User = db.User;

module.exports = {
    create,
    addUser
};

async function create(req) {
    if (!req.user.sub) {
        throw 'Malformed request, does not contain the appropriate user information';
    }

    const body = req.body;
    body.created = new Date();
    body.deadline = new Date(req.body.deadline);
    body.users = [];
    body.users.push(req.user.sub);
    body.balance = 0;
    // console.log(body);
    const goal = new SavingGoal(body);

    if (await SavingGoal.findOne({name: body.name})) {
        throw 'Goal with that name already exists'
    }

    const userObj = await User.findOne({_id: req.user.sub});
    let goalsNew = userObj.goals;
    goalsNew.push(goal._id);

    await goal.save();
    await User.updateOne({'_id': req.user.sub}, {$set: {'goals': goalsNew}});

}

async function addUser(req) {
    if (!req.user.sub) {
        throw 'Malformed request, does not contain the appropriate user information';
    }

    const otherUserObj = await User.findOne({username: req.body.username});
    if (!otherUserObj) {
        throw 'Could not find other user.';
    }
    const goalObj = await SavingGoal.findOne({_id: req.body.goal});
    if (!goalObj) {
        throw 'Could not find saving goal.';
    }

    let goalsNew = otherUserObj.goals;
    goalsNew.push(req.body.goal);

    let usersNew = goalObj.users;
    usersNew.push(otherUserObj._id);

    await SavingGoal.updateOne({'_id': req.body.goal}, {$set: {'users': usersNew}});
    await User.updateOne({'username': req.body.username}, {$set: {'goals': goalsNew}});
}
