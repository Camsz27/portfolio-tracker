const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  coin: { type: mongoose.SchemaTypes.ObjectId, ref: 'Coin' },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
});

assetSchema.virtual('quantity').get(() => {
  return 25;
});

assetSchema.virtual('averagePrice').get(() => {
  return 10;
});

module.exports = mongoose.model('Asset', assetSchema);
