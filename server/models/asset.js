const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  coin: { type: mongoose.SchemaTypes.ObjectId, ref: 'Coin' },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
});

assetSchema.methods.getQuantity = function (cb) {
  this.populate('transactions')
    .then((result) =>
      result.transactions.reduce(
        (partial, transaction) => partial + transaction.quantity,
        0
      )
    )
    .then((result) => cb(result));
};

assetSchema.methods.getAveragePrice = function (cb) {
  this.populate('transactions')
    .then((result) =>
      result.transactions.reduce(
        (partial, transaction) => partial + transaction.pricePerCoin,
        0
      )
    )
    .then((result) => result / this.transactions.length)
    .then((result) => cb(result));
};

module.exports = mongoose.model('Asset', assetSchema);
