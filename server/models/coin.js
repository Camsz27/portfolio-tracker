const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinSchema = new Schema({
  id: { type: String, required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model('Coin', coinSchema);
