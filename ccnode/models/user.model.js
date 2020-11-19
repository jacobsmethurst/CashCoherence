const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    incomes: [{ type: Schema.Types.ObjectId, ref: 'Income', required: true, default: [] }],
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense', required: true, default: [] }],
    savings: [{ type: Schema.Types.ObjectId, ref: 'Saving', required: true, default: [] }],
    goals: [{ type: Schema.Types.ObjectId, ref: 'SavingGoal', required: true, default: [] }]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
