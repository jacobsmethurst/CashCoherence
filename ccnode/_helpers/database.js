const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });

module.exports = {
    User: require('../models/user.model'),
    Income: require('../models/income.model'),
    Expense: require('../models/expense.model'),
    SavingGoal: require('../models/savinggoal.model'),
    Saving: require('../models/saving.model')
};