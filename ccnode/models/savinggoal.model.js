const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    created: { type: Date, required: true, default: Date.now },
    deadline: { type: Date, required: true },
    target: { type: Number, required: true },
    balance: { type: Number, required: true, default: 0 },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('SavingGoal', schema);
