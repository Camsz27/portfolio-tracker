const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, minlength: 3, maxlength: 30, required: true },
  username: { type: String, minlength: 3, maxlength: 30, required: true },
  password: { type: String, minlength: 5, maxlength: 30, required: true },
  assets: [{ type: Schema.Types.ObjectId, ref: 'Asset' }],
  currency: { type: String, required: true, default: 'usd' },
  language: {
    type: String,
    enum: ['eng', 'spa'],
    required: true,
    default: 'eng',
  },
});

module.exports = mongoose.model('User', userSchema);
