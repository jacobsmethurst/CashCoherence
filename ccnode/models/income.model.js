const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Income', schema);
