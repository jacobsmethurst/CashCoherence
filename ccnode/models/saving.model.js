const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String },
    date: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true },
    goal: { type: Schema.Types.ObjectId, ref: 'SavingGoal', required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Saving', schema);
