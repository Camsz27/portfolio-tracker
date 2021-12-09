const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  type: { type: String, enum: ['buy', 'sell', 'transfer'], required: true },
  quantity: { type: Number, min: 0, required: true },
  pricePerCoin: { type: Number, min: 0, required: true },
  date: { type: Date, default: Date.now, required: true },
});

transactionSchema.virtual('total').get(() => {
  return quantity * pricePerCoin;
});

module.exports = mongoose.model('Transaction', transactionSchema);
