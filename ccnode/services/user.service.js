const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;

module.exports = {
    authenticate,
    getById,
    addUser
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username }).populate('incomes');
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash} = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getById(id) {
    // return await User.findOne({ _id: id }).populate('incomes expenses goals savings');
    return await User.findOne({ _id: id })
        .populate('incomes expenses goals')
        .populate({
            path: 'savings',
            populate: {
                path: 'goal',
                model: 'SavingGoal'
            }
        })
        .populate({
            path: 'goals',
            populate: {
                path: 'users',
                populate: {
                    path: 'savings',
                    model: 'Saving'
                }
            }
        });
}

async function addUser(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken.';
    }

    const user = new User(userParam);
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save();
}
