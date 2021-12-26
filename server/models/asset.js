const mongoose = require('mongoose');
const transaction = require('./transaction');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  coin: { type: mongoose.SchemaTypes.ObjectId, ref: 'Coin' },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
});

assetSchema.methods.getQuantity = async function () {
  let data = await this.populate('transactions');
  let ans = data.transactions.reduce(
    (partial, transaction) => partial + transaction.quantity,
    0
  );
  return ans;
};

assetSchema.methods.getAveragePrice = async function () {
  let data = await this.populate('transactions');
  let ans = data.transactions.reduce(
    (partial, transaction) => partial + transaction.pricePerCoin,
    0
  );
  return ans / this.transactions.length;
};

assetSchema.methods.deleteTransaction = function (transactionId) {
  const transactions = this.transactions.filter(
    (transaction) => transaction.toString() !== transactionId.toString()
  );
  this.transactions = transactions;
  this.save();
};

module.exports = mongoose.model('Asset', assetSchema);
